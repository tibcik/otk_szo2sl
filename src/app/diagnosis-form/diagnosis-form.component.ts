import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Medicine } from '../models/medicine';
import { Treatment } from '../models/treatment';
import { DiagnosisService } from '../services/diagnosis.service';
import { MedicineService } from '../services/medicineService';
import { TreatmentsService } from '../services/treatmentService';

import {  RxwebValidators  } from "@rxweb/reactive-form-validators"
import { FileUploadService } from '../file-upload/file-upload.service';
import { formatDate } from '@angular/common';
import { Test } from '../models/test';

@Component({
  selector: 'app-diagnosis-form',
  templateUrl: './diagnosis-form.component.html',
  styleUrls: ['./diagnosis-form.component.css']
})
export class DiagnosisFormComponent implements OnInit {
  @Output() refresh = new EventEmitter();
  @Output() resetTest = new EventEmitter();
  @Output() refreshTests = new EventEmitter();

  @Input() set test(value: Test | null) {
    if(value) {
      this.header = "A páciens " + formatDate(Date.now(), "yyyy.MM.dd", "en") + "-én megjelent a '" + value.name + "' nevű szűrővizsgálaton!\n";
      this.diagnosisForm.patchValue({
        diagnosis: "Ide írja a szűrővizsgálat eredményét...",
        testId: value.id
      })

      this.treatmentsFormArray.clear();
      this.medicinesFormArray.clear();
      this.reportsFormArray.clear();
    }
  }
 
  @Input() patientID: number = -1;

  header = '';

  diagnosisForm: FormGroup = this.formBuilder.group({
    patientId: [],
    id: [],
    diagnosis: ['', [Validators.required, Validators.minLength(10)]],
    testId: [''],
    treatments: this.formBuilder.array([this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, RxwebValidators.unique()]]
    })]),
    medicines: this.formBuilder.array([this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, RxwebValidators.unique()]]
    })]),
    reports: this.formBuilder.array([this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      date: ['', Validators.required],
      file: ['', Validators.required],
      data: [],
      fileSource: [],
      progress: []
    })])
  })

  treatmentsFormArray = this.diagnosisForm.get("treatments") as FormArray;
  medicinesFormArray = this.diagnosisForm.get("medicines") as FormArray;
  reportsFormArray = this.diagnosisForm.get("reports") as FormArray;

  treatments: Treatment[] = [];
  medicines: Medicine[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private treatmentService: TreatmentsService, 
    private medicineService: MedicineService,
    private diagnosisService: DiagnosisService,
    private fileUploadService: FileUploadService
  ) { }

  async ngOnInit(): Promise<void> {
    this.treatments = await this.treatmentService.loadTreatments();
    this.medicines = await this.medicineService.loadMedicines();

    this.diagnosisForm.patchValue({
      patientId: this.patientID,
      testId: -1
    });
  }

  toGroup(item: AbstractControl) {
    return item as FormGroup;
  }

  isNotUnique(item: AbstractControl) {
    if(item.errors !== null) {
      return item.errors["unique"];
    }

    return false;
  }

  addTreatment() {
    this.treatmentsFormArray.push(this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, RxwebValidators.unique()]]
    }));
  }

  removeTreatment(i: number) {
    this.treatmentsFormArray.removeAt(i);
  }

  addMedicine() {
    this.medicinesFormArray.push(this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, RxwebValidators.unique()]]
    }));
  }

  removeMedicine(i: number) {
    this.medicinesFormArray.removeAt(i);
  }

  addReport() {
    this.reportsFormArray.push(this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      date: ['', Validators.required],
      file: ['', Validators.required],
      data: [],
      fileSource: [],
      progress: []
    }));
  }

  removeReport(i: number) {
    this.reportsFormArray.removeAt(i);
  }

  onInputChange(event: any, group: FormGroup) {
    const idRe = /\/(\d+)\/$/
    if(idRe.exec(event.target.value)) {
      const id = event.target.value.match(idRe)[1] * 1; // TODO: átalakításnak utánnanézni...
      group.patchValue({
        id: id
      });
    } else {
      group.patchValue({
        id: null,
        name: ''
      });
    }
  }

  onFileChange(event: any, group: FormGroup) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      group.patchValue({
        fileSource: file
      });
    }
  }

  clearForm() {
    this.removeTest();

    this.diagnosisForm.reset({
      patientId: this.patientID,
      id: '',
      diagnosis: '',
      testId: -1,
      treatments: this.formBuilder.array([]),
      medicines: this.formBuilder.array([]),
      reports: this.formBuilder.array([])
    });
    this.treatmentsFormArray = this.diagnosisForm.get("treatments") as FormArray;
    this.medicinesFormArray = this.diagnosisForm.get("medicines") as FormArray;
    this.reportsFormArray = this.diagnosisForm.get("reports") as FormArray;

    this.treatmentsFormArray.clear();
    this.medicinesFormArray.clear();
    this.reportsFormArray.clear();

    this.addTreatment();
    this.addMedicine();
    this.addReport();
  }

  async addDiagnosis() {
    this.diagnosisForm.disable();

    const values = this.diagnosisForm.value;

    if(values['testId'] !== -1) {
      values['diagnosis'] = this.header + values['diagnosis'];
    }

    const diagnosis = await this.diagnosisService.addDiagnosis(this.diagnosisForm.value);

    let inProgress = 0;

    if(values['reports'] == 0) {
      this.clearForm();
      this.diagnosisForm.enable();
      this.refresh.emit();
    }

    /*
    Ez a rész itt elképzelhető, hogy hibát okoz... Elképzelhető, hogy az adatbázisba más
    sorrendben kerülnek be a rekordok mint ahogy a FormArray-ban vannak a fájlok???
    */
    for(let i = 0; i < values['reports'].length; i++) {
      inProgress++;
      this.fileUploadService.upload(values['reports'][i]['fileSource'], diagnosis.reports[i].id).subscribe(
        (event: any) => {
          const control = this.reportsFormArray.at(i);

          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round(event.loaded / event.total * 100);
              control.patchValue({
                progress: progress
              });
              break;
            case HttpEventType.Response:
              control.patchValue({
                progress: 0
              });
              inProgress--;
              if(inProgress == 0) {
                this.clearForm();
                this.diagnosisForm.enable();
                this.refresh.emit();
              }
          }
        }
      )
    }
  }

  removeTest() {
    this.header = '';
    this.resetTest.emit();
    this.refreshTests.emit();
    let diagnosis = this.diagnosisForm.get("diagnosis")?.value;
    if(diagnosis == "Ide írja a szűrővizsgálat eredményét...")
      diagnosis = "";

    this.diagnosisForm.patchValue({
      diagnosis: diagnosis,
      testId: -1
    });
  }
}
