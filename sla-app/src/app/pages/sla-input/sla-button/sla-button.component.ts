import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'button-view',
  templateUrl: './sla-button.component.html',
  styleUrls: ['./sla-button.component.scss'],
})
export class SlaButtonComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value;

  constructor() { }

  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value;
  }

  saveData() {
    this.save.emit(this.rowData);
  }

  deleteData() {
    this.delete.emit(this.rowData);
  }
}
