import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../models/patient';
import { PerformedTesttService } from '../services/performed-test.service';
import { Test } from '../models/test';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() _testId!: number;

  @Input() set testId(value: number) {
    if(value >= 0) {
      this.testService.loadTest('' + value).then(test => {
        this.test = test;
        this.performedTestService.loadNeededTestByTest(test.id).then(patients => {
          this.patients = patients;
        });

        this.notify = "Tisztelt %PÁCIENS_NÉV%!\n\nKérem a következő napok egyikén jelenjen meg a '" + test.name + "' szűrővizsgűlaton.\n\nTisztelettel:\nDr. XY";
      })
    }
  }

  notify!: string;
  test!: Test;
  patients!: Patient[];

  constructor(
    private performedTestService: PerformedTesttService,
    private testService: TestService
  ) { }

  ngOnInit(): void {
  }
}
