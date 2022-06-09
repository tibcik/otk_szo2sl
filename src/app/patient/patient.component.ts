import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderTypes, Patient } from '../models/patient';
import { Diagnosis } from '../models/diagnosis';
import { PatientService } from '../services/patient.service';
import { PerformedTesttService } from '../services/performed-test.service';
import { Test } from '../models/test';
import { DiagnosisService } from '../services/diagnosis.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patient: Patient = {
    id: -1,
    name: '',
    b_date: null,
    taj: 0,
    gender: GenderTypes.MALE,
    diagnoses: [],
    tests: []
  };
  tests!: Test[];
  diagnoses!: Diagnosis[];

  test!: Test | null;

  needed_test_count = 0;

  constructor(
    private patientService: PatientService, 
    private performedTests: PerformedTesttService, 
    private diagnosisService: DiagnosisService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.queryParams['id'];

    this.patient = await this.patientService.loadPatientById(id);
    this.tests = await this.performedTests.loadNeededTestByPatient(id);
    this.diagnoses = await this.diagnosisService.loadDiagnoses(id);
  }

  async refreshDiagnoses() {
    this.diagnoses = await this.diagnosisService.loadDiagnoses(this.patient.id);
  }

  performeTest(test: Test) {
    this.test = test;
  }

  resetTest() {
    this.test = null;
  }

  async refreshTests() {
    this.tests = await this.performedTests.loadNeededTestByPatient(this.patient.id);
  }

  async deletePatient() {
    await this.patientService.deletePatient(this.patient.id);
    this.router.navigateByUrl('');
  }
}
