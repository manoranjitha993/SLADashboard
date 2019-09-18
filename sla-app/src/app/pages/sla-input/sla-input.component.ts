import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { SlaData } from '../../models/sla-data.model';
import { SlaEntryComponent } from './sla-entry/sla-entry.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SlaInputService } from '../../services/sla-input.service';
import { SlaDropdown } from '../../models/sla-dropdown.model';
import { SlaButtonComponent } from './sla-button/sla-button.component';
import { MessageModalComponent } from './message-modal/message-modal.component';

@Component({
  selector: 'sla-input',
  templateUrl: './sla-input.component.html',
  styleUrls: ['./sla-input.component.scss']
})
export class SlaInputComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  slaDropDown: SlaDropdown;
  selectedId: number;
  deleteConfirmModal: NgbModalRef;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
     },
    /*actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        { name: 'blank', title: '' },
        { name: 'editData', title: '<i class="nb-edit"></i>' },
        { name: 'deleteData', title: '<i class="nb-close"></i>' }
      ],
    },*/
    actions: false,
    mode: external,
    columns: {
      DashboardName: {
        title: 'Dashboard',
        type: 'string',
         width: '15rem',
      },
      SLAName: {
        title: 'SLA',
        type: 'string',
        width: '15rem',
      },
      SLATier: {
        title: 'Tier',
        type: 'string',
        width: '10rem',
      },
      SLAMonthName: {
        title: 'Month',
        type: 'string',
        width: '5rem',
      },
      SLAYear: {
        title: 'Year',
        type: 'number',
        width: '5rem',
      },
      
      SLAMet: {
        title: 'Met',
        type: 'number',
        width: '7rem',
      },
      SLANotMet: {
        title: 'Not Met',
        type: 'number',
        width: '7rem',
      },
      button: {
        title: 'Actions',
        filter: false,
        type: 'custom',
        width: '5rem',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: SlaButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe(row => {
            this.openEditModal(row);
          });
          instance.delete.subscribe(row => {
            this.openDeleteModal(row);
          });
        },
      }
    },
  };


//dropdown and grid data is interelated
  constructor(private slaInputService: SlaInputService, private modalService: NgbModal) {
    this.slaInputService.getSLADataList().subscribe(result => {
      this.source.load(result);
      this.slaInputService.getSLADropdowns().subscribe(dropdown => {
        this.slaDropDown = dropdown;
      }, error => console.error(error));
    }, error => console.error(error));
  }

  addSLAData() {
    var slaData = new SlaData();
    slaData.SLADataId = 0;
    const activeModal = this.modalService.open(SlaEntryComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'SLA Data';
    activeModal.componentInstance.modalData = slaData;
    activeModal.componentInstance.modalDropdowns = this.slaDropDown;
    activeModal.componentInstance.gridComponent = this;
  }

  openEditModal(row): void {
    const activeModal = this.modalService.open(SlaEntryComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'SLA Data';
    activeModal.componentInstance.modalData = row;
    activeModal.componentInstance.modalDropdowns = this.slaDropDown;
    activeModal.componentInstance.gridComponent = this;
  }

  openDeleteModal(row): void {
    this.selectedId = row.SLADataId;
    this.deleteConfirmModal = this.modalService.open(MessageModalComponent, {
      size: 'sm', container: 'nb-layout', windowClass: 'message-modal-class'
    });
    this.deleteConfirmModal.componentInstance.modalMessage = 'Are you sure to delete the selected record?';
    this.deleteConfirmModal.componentInstance.modalType = 'confirmDelete';
    this.deleteConfirmModal.componentInstance.parentModal = this;
  }

  deleteSLAData(slaDataId) {
    var slaData = new SlaData();
    slaData.SLADataId = slaDataId;
    this.slaInputService.deleteSLAData(slaData).subscribe(result => {
      this.deleteConfirmModal.close();
      const activeModal = this.modalService.open(MessageModalComponent, {
        size: 'sm', container: 'nb-layout', windowClass: 'message-modal-class'
      });
      activeModal.componentInstance.modalMessage = 'Data Deleted Successfully';
      activeModal.componentInstance.modalType = 'message';
      activeModal.componentInstance.parentModal = this;
    }, error => console.error(error));
  }

  ngOnInit() {
  }

  refreshGrid() {
    this.slaInputService.getSLADataList().subscribe(result => {
      this.source.load(result);
    }, error => console.error(error));
  }

}
