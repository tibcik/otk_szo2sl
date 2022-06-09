import { Component, OnInit } from '@angular/core';
import { Test } from '../models/test';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  tests!: Test[];

  constructor(
    private testService: TestService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.tests = await this.testService.loadTests();
  }

}
