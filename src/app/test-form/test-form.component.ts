import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from '../services/test.service';
import { genderValidator } from '../validators/gender.directive';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
  testForm: FormGroup = this.formBuilder.group({
    id: [],
    name: ['', Validators.required],
    start_age: ['', [Validators.required, Validators.min(0)]],
    interval: ['', Validators.required],
    gender: ['all', genderValidator()]
  })

  get name() { return this.testForm.get("name") }
  get start_age() { return this.testForm.get("start_age") }
  get interval() { return this.testForm.get("interval") }

  constructor(
    private formBuilder: FormBuilder,
    private testService: TestService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async newTest() {
    const data = this.testForm.value
    const test = await this.testService.createTest(data);
    this.router.navigateByUrl("/tests");
    //this.router.navigateByUrl(`/tests?id=${test.id}`);
  }
}
