import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../models/patient';
import { GenderTypes, Test } from '../models/test';
import { PerformedTesttService } from '../services/performed-test.service';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  test: Test = {
    id: -1,
    name: '',
    start_age: 0,
    interval: 0,
    gender: GenderTypes.ALL,
    patients: []
  };

  patients!: Patient[];

  constructor(
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private performedTestService: PerformedTesttService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.test = await this.testService.loadTest(id);
    this.patients = await this.performedTestService.loadNeededTestByTest(id);
  }

  getLastTestDate(patient: Patient) {

    if(patient.tests.length > 0) {
      const lastVisit = new Date(Date.now()).getFullYear() - new Date(patient.tests[0].last).getFullYear();
      if(lastVisit == 0) return "Ebben az évben.";
      return `${lastVisit} éve.`
    }

    return "Eddig még nem volt."
  }

  async deleteTest() {
    await this.testService.deleteTest(this.test.id);
    this.router.navigateByUrl('/tests');
  }

}
