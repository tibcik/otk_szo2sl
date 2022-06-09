import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients!: Patient[];
  matchPatients!: Patient[];
  search: string = '';

  constructor(
    private patientService: PatientService,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.patients = await this.patientService.loadPatients();

    this.matchPatients = this.patients;
  }

  async searchChange() {
    const search = this.search.replace(/^[ 0]+| +$/g, '');
    this.matchPatients = this.patients.filter(patient => patient.taj.toString().indexOf(search) !== -1)
  }

  viewPatient(id: number) {
    this.router.navigate(['/patient'],{queryParams: {id: id}})
  }

  newPatient() {
    this.router.navigate(['/new_patient']);
  }
}
