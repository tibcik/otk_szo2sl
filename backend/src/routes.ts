import express from 'express';
import { DiagnosisController } from './controllers/diagnosis-controller';
import { MedicineController } from './controllers/medicine-controller';
import { PatientController } from './controllers/patient-controller';
import { PerformedTestController } from './controllers/perfomedtest-controller';
import { ReportController } from './controllers/report-controller';
import { TestController } from './controllers/test-controller';
import { TreatmentController } from './controllers/treatment-controller';

export function getRouter(){
    const router = express.Router();

    const patientController = new PatientController()
    const diagnosisController = new DiagnosisController()
    const performedTestController = new PerformedTestController()
    const treatmentController = new TreatmentController();
    const medicineController = new MedicineController();
    const reportController = new ReportController();
    const testController = new TestController();

    router.get('/patients', patientController.getAll);
    router.get('/patients/:id', patientController.getOne);
    router.get('/patients/taj/:taj', patientController.getOneByTAJ);
    router.post('/patients', patientController.create);
    router.delete('/patients/:id', patientController.delete);

    router.get('/diagnoses', diagnosisController.getAll);
    router.get('/diagnoses/:id', diagnosisController.getOne);
    router.post('/diagnoses/', diagnosisController.create);

    router.get('/performed_tests', performedTestController.getAll);
    router.get('/performed_tests/needed', performedTestController.getNeededTests);

    router.get('/treatments', treatmentController.getAll);

    router.get('/medicines', medicineController.getAll);

    router.get('/reports/:id', reportController.getOne);
    router.post('/reports/:id', reportController.create);

    router.get('/tests', testController.getAll);
    router.get('/tests/:id', testController.getOne);
    router.post('/tests', testController.create);
    router.delete('/tests/:id', testController.delete);

    return router;
}