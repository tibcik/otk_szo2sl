import DiagnosisInitializer from "./diagnosisInitializer";
import MedicineInitializer from "./medicineInitializer";
import PatientInitializer from "./patientInitializer";
import PerformedTestInitializer from "./performedTestInitializer";
import ReportInitializer from "./reportInitializer";
import TestInitializer from "./testInitializer";
import TreatmentInitializer from "./treatmentInitializer";

export default async function initializeDatabase() {
    /* Ezt itt szebben is meg lehetett volna csinálni, de mivel a feladatnak nem
    volt része az adatbázis feltöltése "random" adatokkat nem foglalkoztam vele többet. */
    const patientCount = 20;
    const diagnosisCount = 30;
    const medicineCount = 100;
    const treatmentCount = 80;
    const reportCount = 20;
    const testCount = 15;
    const performedTestCount = 10;

    const diagnosisMedicinesCount = 30;
    const diagnosisTreatmentsCount = 30;

    const patientInitializer = new PatientInitializer(patientCount);
    await patientInitializer.initialize();
    const diagnosisInitializer = new DiagnosisInitializer(diagnosisCount, patientInitializer.entities);
    await diagnosisInitializer.initialize();

    const medicineInitializer = new MedicineInitializer(medicineCount);
    const treatmentInitializer = new TreatmentInitializer(treatmentCount);
    const reportInitializer = new ReportInitializer(reportCount, diagnosisInitializer.entities);

    await medicineInitializer.initialize();
    await treatmentInitializer.initialize();
    await reportInitializer.initialize();

    const testInitializer = new TestInitializer(testCount);
    await testInitializer.initialize();

    const performedTestInitializer = new PerformedTestInitializer(performedTestCount, patientInitializer.entities, testInitializer.entities);
    await performedTestInitializer.initialize();

    await medicineInitializer.initRelationship(diagnosisMedicinesCount, diagnosisInitializer.entities);
    await treatmentInitializer.initRelationship(diagnosisTreatmentsCount, diagnosisInitializer.entities);
}