import { Component, Input, OnInit } from '@angular/core';
import { Diagnosis } from '../models/diagnosis';
import { Medicine } from '../models/medicine';
import { Report } from '../models/report';
import { Treatment } from '../models/treatment';
import * as proxyConf from 'src/proxy.conf.json';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {
  @Input()
  diagnosis!: Diagnosis;
  treatments!: Treatment[];
  medicines!: Medicine[];
  reports!: Report[];

  constructor( ) { }

  ngOnInit(): void {
  }

  downloadReport(report: Report) {
    const proxy = proxyConf;
    const apiUrl = proxy['/api'].target;
    
    window.open(apiUrl + "/api/reports/" + report.id, '_blank');
  }
}
