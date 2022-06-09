import { AppDataSource } from "../data-source";
import { Diagnosis } from "../entity/Diagnosis";
import { Patient } from "../entity/Patient";
import { PerformedTest } from "../entity/PerformedTest";
import { Report } from "../entity/Report";
import { Test } from "../entity/Test";
import { Controller } from "./base-controller";

export class DiagnosisController extends Controller{
    repository = AppDataSource.getRepository(Diagnosis);

    getAll = async (req, res) => {
        const patientRepository = AppDataSource.getRepository(Patient);

        // Ellenőrzés
        const patientId = req.query.patientId || '';
        
        if(patientId === '') {
            res.status(400).json({ message: "Hibás kérés!\nKérem vegye fel a kapcsolatot a fejlesztővel!\nDIAG_getALL_patientId"});
            return;
        }

        try {
            const patient = await patientRepository.findOneBy({id: patientId});

            const diagnoses = await this.repository.find({
                where: {patient: patient}, 
                relations: { medicines: true, treatments: true, reports: true },
                order: { date: "DESC" }});

            res.status(200).json(diagnoses);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    create = async (req, res) => {
        const patientRepository = AppDataSource.getRepository(Patient);
        const testRepository = AppDataSource.getRepository(Test);
        const performedTestRepository = AppDataSource.getRepository(PerformedTest);
        const reportRepository = AppDataSource.getRepository(Report);

        const data = req.body as {};
        const reports = data['reports'];
        data['reports'] = [];

        try {
            const patient = await patientRepository.findOneBy({id: data['patientId']});
            data['patient'] = patient;

            if(data['testId'] !== -1) {
                const test = await testRepository.findOneBy({id: data['testId']});
                
                let performed_test = await performedTestRepository.findOneBy({
                    patient: patient,
                    test: test
                });
                
                if(performed_test) {
                    performed_test.last = new Date(Date.now());
                } else {
                    performed_test = performedTestRepository.create({patient: patient, test: test, last: new Date(Date.now())});
                }

                await performedTestRepository.save(performed_test);
            }

            const entity = this.repository.create(data);

            entity.id = null;
            const entityInserted = await this.repository.save(entity);

            for await(let report of reports) {
                report['diagnosis'] = entityInserted;
                const reportEntity = reportRepository.create(report as {});
                entityInserted.reports.push(reportEntity);
                await reportRepository.save(reportEntity);
            }

            const diagnosis = await this.repository.findOne({
                where: {id: entityInserted.id}, 
                relations: { medicines: true, treatments: true, reports: true }
            });
            
            res.status(200).json(diagnosis);
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: err.message });
        }
    }
}