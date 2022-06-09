import { AppDataSource } from "../data-source";
import { Patient } from "../entity/Patient";
import { Controller } from "./base-controller";

export class PatientController extends Controller{
    repository = AppDataSource.getRepository(Patient);

    create = async (req, res) => {
        const entity = this.repository.create(req.body as {});

        entity.id = null;

        let sum = 0;
        let taj = (entity.taj / 10) | 0;
        for(let i = 7; i >= 0; i--) {
            let num = taj % 10;
            taj = (taj / 10) | 0;

            if(i % 2) sum += num * 7;
            else sum += num * 3;
        }
        let checksum = sum % 10;

        if(checksum !== (entity.taj % 10)) {
            res.status(400).json({ message: "Hibás kérés!\nKérem vegye fel a kapcsolatot a fejlesztővel!\nPAT_create_checksum"});
            return;
        }

        try {
            const entityInserted = await this.repository.save(entity);
            res.status(200).json(entityInserted);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getAll = async (req, res) => {
        const taj = req.query.taj || '';

        try {
            const patientQuery = this.repository.createQueryBuilder()
                .where("CAST(taj AS CHAR) LIKE CONCAT('%', :param, '%')", {param: taj})
                .andWhere("taj IS NOT NULL");

            const patient = await patientQuery.getMany();
            res.status(200).json(patient);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getOneByTAJ = async (req, res) => {
        const entityTAJ = req.params.id;

        try {
            const entity = await this.repository.findOneBy({taj:entityTAJ});
            if (!entity) {
                res.status(404).json({ message: 'Hibás kérés!\nKérem vegye fel a kapcsolatot a fejlesztővel!\nPAT_getOneByTAJ_entityTAJ' });
                return;
            }
            res.status(200).json(entity);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    delete = async (req, res) => {
        try {
            const entityId = req.params.id;
            const entity = await this.repository.findOneBy({ id: entityId });
            if (!entity) {
                res.status(404).json({ message: 'Hibás kérés!\nKérem vegye fel a kapcsolatot a fejlesztővel!\nPAT_getOneByTAJ_entityId' });
                return;
            }
            entity.taj = null;

            const updatedEntity = await this.repository.save(entity);
            res.status(200).json(updatedEntity);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}