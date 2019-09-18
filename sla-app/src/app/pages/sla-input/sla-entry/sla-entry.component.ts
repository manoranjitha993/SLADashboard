import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SlaData } from '../../../models/sla-data.model';
import { DashboardType } from '../../../models/dashboard-type.model';
import { DashboardDefinition } from '../../../models/dashboard-definition.model';
import { DashboardMonth } from '../../../models/dashboard-month.model';
import { DashboardYear } from '../../../models/dashboard-year.model';
import { DashboardTier } from '../../../models/dashboard-tier.model';
import { DashboardData } from '../../../models/dashboard-data.model';
import { SlaInputService } from '../../../services/sla-input.service';
import { SlaDropdown } from '../../../models/sla-dropdown.model';
import { DashboardDropdownItem } from '../../../models/dashboard-dropdown-item.model';
import { SlaDropdownItem } from '../../../models/sla-dropdown-item.model';
import { TierDropdownItem } from '../../../models/tier-dropdown-item.model';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { debug } from 'util';
import { SlaInputComponent } from '../sla-input.component';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'sla-entry',
  templateUrl: './sla-entry.component.html',
  styleUrls: ['./sla-entry.component.scss']
})
export class SlaEntryComponent implements OnInit {
  modalHeader: string;
  modalData: SlaData;
  modalDropdowns: SlaDropdown;
  gridComponent: SlaInputComponent;
  slaEntryForm: FormGroup;

  slaDataId: number;
  selectedDashboard: number;
  dashboardItems: DashboardDropdownItem[] = [];

  selectedSLA: number;
  slaItems: SlaDropdownItem[] = [];

  selectedTier: number;
  tierItems: TierDropdownItem[] = [];

  selectedMonth: number;
  months: DashboardMonth[] = [
    { Id: 0, Name: '--Select an Item--' },
    { Id: 1, Name: 'January' },
    { Id: 2, Name: 'February' },
    { Id: 3, Name: 'March' },
    { Id: 4, Name: 'April' },
    { Id: 5, Name: 'May' },
    { Id: 6, Name: 'June' },
    { Id: 7, Name: 'July' },
    { Id: 8, Name: 'August' },
    { Id: 9, Name: 'September' },
    { Id: 10, Name: 'October' },
    { Id: 11, Name: 'November' },
    { Id: 12, Name: 'December' },
  ];

  selectedYear: number;
  years: DashboardYear[] = [
    { Year: 0, YearName: '--Select an Item--' },
    { Year: 2018, YearName: '2018' },
    { Year: 2019, YearName: '2019' },
    { Year: 2020, YearName: '2020' },
    { Year: 2021, YearName: '2021' },
    { Year: 2022, YearName: '2022' },
    { Year: 2023, YearName: '2023' },
    { Year: 2024, YearName: '2024' },
    { Year: 2025, YearName: '2025' },
    { Year: 2026, YearName: '2026' },
    { Year: 2027, YearName: '2027' },
    { Year: 2028, YearName: '2028' },
    { Year: 2029, YearName: '2029' },
    { Year: 2030, YearName: '2030' }
  ];

  met: number;
  notmet: number;
  slaComment: string;

  dashboardRequired: boolean = false;   //validation 
  slaRequired: boolean = false;
  tierRequired: boolean = false;
  yearRequired: boolean = false;
  monthRequired: boolean = false;
  metRequired: boolean = false;
  metIsNumber: boolean = false;
  notmetRequired: boolean = false;
  notmetIsNumber: boolean = false;
  commentMaxLength: boolean = false;


  constructor(private slaInputService: SlaInputService,
              private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.resetForm();
    this.dashboardItems = this.modalDropdowns.DashboardItemList;
    this.slaItems = this.modalDropdowns.SLAItemList;
    this.tierItems = this.modalDropdowns.TierItemList;
    this.slaDataId = this.modalData.SLADataId;
    if (this.modalData.SLADataId != 0) {
      this.selectedDashboard = this.modalData.DashboardId;
      this.selectedSLA = this.modalData.SLAId;
      this.selectedTier = this.modalData.SLATierId == 0 ? null : this.modalData.SLATierId;
      this.selectedMonth = this.modalData.SLAMonth;
      this.selectedYear = this.modalData.SLAYear;
      this.met = this.modalData.SLAMet;
      this.notmet = this.modalData.SLANotMet;
      this.slaComment = this.modalData.SLAComment;
    }

    this.slaEntryForm.get('selectedSLA').valueChanges.subscribe(
      (selectedSLA: number) => {
        if (selectedSLA == 6 || selectedSLA == 7) {
          this.slaEntryForm.get('selectedTier').setValidators([]);
        } else {
          this.slaEntryForm.get('selectedTier').setValidators([Validators.required]);
        }
        this.slaEntryForm.get('selectedTier').updateValueAndValidity();
      }
    )
  }

  createForm() {
    this.slaEntryForm = this.fb.group({
      selectedDashboard: ['', Validators.required],
      selectedSLA: ['', Validators.required],
      selectedTier: ['', Validators.required],
      selectedMonth: ['', Validators.required],
      selectedYear: ['', Validators.required],
      met: ['', Validators.required],
      notmet: ['', Validators.required],
      slaComment: ['', Validators.maxLength(500)]
    });
  }

  changeSLAItem(event) {
    if (this.selectedSLA == 2 || this.selectedSLA == 3) {
      this.tierItems = this.modalDropdowns.TierItemList.filter(item => (item.SLATierId === 0 || item.SLATierId === 7
        || item.SLATierId === 8 || item.SLATierId === 9 || item.SLATierId === 10))
    }
    else if (this.selectedSLA == 4 || this.selectedSLA == 5) {
      this.tierItems = this.modalDropdowns.TierItemList.filter(item => (item.SLATierId === 0
        || item.SLATierId === 7 || item.SLATierId === 8))
    }
    else {
      this.tierItems = this.modalDropdowns.TierItemList.filter(item => (item.SLATierId === 0 || item.SLATierId === 1
        || item.SLATierId === 2 || item.SLATierId === 3 || item.SLATierId === 4))
    }

    this.selectedTier = 0;
  }

  submitInput() {
    if (this.validateData() == true) {
      var slaData = new SlaData();
      slaData.SLADataId = this.slaDataId;
      slaData.DashboardId = this.selectedDashboard;
      slaData.SLAId = this.selectedSLA;
      slaData.SLATierId = this.selectedTier;
      slaData.SLAYear = this.selectedYear;
      slaData.SLAMonth = this.selectedMonth;
      slaData.SLAMet = this.met;
      slaData.SLANotMet = this.notmet;
      slaData.SLAComment = this.slaComment == null ? '' : this.slaComment;
   
      this.slaInputService.saveSLAData(slaData).subscribe(result => {
       console.log(+result);
      if(result == 1)
      {
        const activeModal = this.modalService.open(MessageModalComponent, {
        size: 'sm', container: 'nb-layout', windowClass: 'message-modal-class'
      });
      activeModal.componentInstance.modalMessage = 'Data Exist!';
      activeModal.componentInstance.modalType = 'message';

      }
      else
      {
           const activeModal = this.modalService.open(MessageModalComponent, {
        size: 'sm', container: 'nb-layout', windowClass: 'message-modal-class'
        });
        activeModal.componentInstance.modalMessage = 'Data Saved Succesfully';
        activeModal.componentInstance.modalType = 'message';
        activeModal.componentInstance.parentModal = this;
      } 
      }, error => console.error(error));
     
    }
  }

  validateData() {
    var success = true;

    if (this.selectedDashboard == 0) {
      this.dashboardRequired = true;
      success = false;
    }
    else {
      this.dashboardRequired = false;
    }

    if (this.selectedSLA == 0) {
      this.slaRequired = true;
      success = false;
    }
    else {
      this.slaRequired = false;
    }
    
    if (this.selectedTier == 0 && (!(this.selectedSLA == 6 || this.selectedSLA == 7))) {
      this.tierRequired = true;
      success = false;
    }
    else {
      this.tierRequired = false;
    }

    if (this.selectedYear == 0) {
      this.yearRequired = true;
      success = false;
    }
    else {
      this.yearRequired = false;
    }

    if (this.selectedMonth == 0) {
      this.monthRequired = true;
      success = false;
    }
    else {
      this.monthRequired = false;
    }

    if (this.met == null) {
      this.metRequired = true;
      this.metIsNumber = false;
      success = false;
    }
    else if (Number(this.met) == NaN) {
      this.metRequired = false;
      this.metIsNumber = true;
      success = false;
    }
    else {
      this.metRequired = false;
      this.metIsNumber = false;
    }
    
    if (this.notmet == null) {
      this.notmetRequired = true;
      this.notmetIsNumber = false;
      success = false;
    }
    else if (Number(this.notmet) == NaN) {
      this.notmetRequired = false;
      this.notmetIsNumber = true;
      success = false;
    }
    else {
      this.notmetRequired = false;
      this.notmetIsNumber = false;
    }

    if (this.slaComment.length > 500) {
      this.commentMaxLength = true;
      success = false;
    }
    else {
      this.commentMaxLength = false;
    }

    return success;
  }

  resetForm() {
    this.slaDataId = 0;
    this.selectedDashboard = 0;
    this.selectedSLA = 0;
    this.selectedTier = 0;
    this.selectedMonth = 0;
    this.selectedYear = 0;
    this.met = null;
    this.notmet = null;
    this.slaComment = '';
  }

  closeModal() {
    this.activeModal.close();
  }

  refreshGrid() {
    this.activeModal.close();
    this.gridComponent.refreshGrid();
  }

}
