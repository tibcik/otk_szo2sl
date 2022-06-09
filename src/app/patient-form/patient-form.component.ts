import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { maxDateValidator } from '../validators/date.directive';
import { genderValidator } from '../validators/gender.directive';
import { tajValidator } from '../validators/taj.directive';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  patientForm: FormGroup = this.formBuilder.group({
    id: [],
    name: ['', [Validators.required]],
    b_date: ['', [Validators.required, maxDateValidator(new Date(Date.now()))]],
    taj: ['', [Validators.required, tajValidator()]],
    gender: ['male', genderValidator()]
  })

  get name() { return this.patientForm.get("name") }
  get b_date() { return this.patientForm.get("b_date") }
  get taj() { return this.patientForm.get("taj") }

  exist = '-1';

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async newPatient() {
    const data = this.patientForm.value
    const exist = await this.patientService.loadPatientsByTaj(data['taj']);

    if(exist.length > 0) {
      this.exist = this.taj?.value;
      return;
    }

    const patient = await this.patientService.creatPatient(data);
    this.router.navigateByUrl(`/patient?id=${patient.id}`);
  }
}
