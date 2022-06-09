import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  error = "";
  title = 'otk_szo2sl';

  @ViewChild('buttonEl') divClick!: ElementRef;

  showError(error: string) {
    this.error = error;
    this.divClick.nativeElement.click();
  }
}
