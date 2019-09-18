import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { SlaEntryComponent } from '../sla-entry/sla-entry.component';

@Component({
  selector: 'message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {
  modalHeader: string;
  modalMessage: string;
  modalType: string;
  parentModal: any;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
    this.parentModal.refreshGrid();
  }

  deleteSLAData() {
    this.parentModal.deleteSLAData(this.parentModal.selectedId);
  }

}
