import { AppDataSource } from "../data-source";
import { Report } from "../entity/Report";
import { Controller } from "./base-controller";

export class ReportController extends Controller{
    repository = AppDataSource.getRepository(Report);

    create = async (req, res) => {
        const entityId = req.params.id;
        const fileData = req.files.file;

        try {
            const report = await this.repository.findOneBy({ id: entityId });
            
            if (!report) {
                res.status(404).json({ message: 'Hibás kérés!\nKérem vegye fel a kapcsolatot a fejlesztővel!\nREP_create_entityId' });
                return;
            }

            const uploadPath = __dirname + '/../../reports/' + report.id + "_" + fileData.name;
            await fileData.mv(uploadPath);
            report.path = report.id + "_" + fileData.name;
            const entityUpdated = await this.repository.save(report);

            res.status(200).json(entityUpdated);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getOne = async (req, res) => {
        const entityId = req.params.id;

        try {
            const report = await this.repository.findOneBy({ id: entityId });

            if (!report) {
                res.status(404).json({ message: 'Hibás kérés!\nKérem vegye fel a kapcsolatot a fejlesztővel!\nREP_getOne_entityId' });
                return;
            }

            res.download('reports/' + report.path);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}