import { Component , OnInit} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { DBDatas } from '../../models/DB-Data.model';
import { DbdatasService } from '../../services/dbdatas.service';
//import { DBItem } from '../../models/DB-Item.model';
//import { DBSLA } from '../../models/DB-SLA.model';
//import { DBItemMonthwise } from '../../models/DB-Item-Monthwise.model';
import { DBType } from '../../models/DB-Type.model';
@Component({
  selector: 'dbdatas',
  templateUrl: './dbdatas.component.html',
  styleUrls: ['./dbdatas.component.scss']
})
export class DbdatasComponent implements OnInit {
   
   source: LocalDataSource = new LocalDataSource();
   DBDatas: DBDatas ;
  // DBItem: DBItem;
   //DBSLA: DBSLA;
   dashboardId:any[] = [];
  // dbDatas:any[];

  selectedId: number;
  selectedType: DBType;
  dbTypes: DBType[] = [];

  M1 : string = '1' ;

  settings = {

   actions: false,
   mode: external,
    columns: {
     
      SLANumber:{
       title:'SLANumber',
       type: 'string',
      },
      SLADefinition: {
        title: 'SLADefinition',
        type: 'string',
      },
      SLATier:{
        title: 'SLATier',
        type: 'string',
      },
      M1SLAPercent: {
        title: 'Month1',
        type: 'string',
      },
       M2SLAPercent: {
        title: 'Month2',
        type: 'string',
      },
       M3SLAPercent: {
        title: 'Month3',
        type: 'string',
      },
       M4SLAPercent: {
        title: 'Month4',
        type: 'string',
      },
       M5SLAPercent: {
        title: 'Month5',
        type: 'string',
      },
       M6SLAPercent: {
        title: 'Month6',
        type: 'string',
      },
       M7SLAPercent: {
        title: 'Month7',
        type: 'string',
      },
       M8SLAPercent: {
        title: 'Month8',
        type: 'string',
      },
       M9SLAPercent: {
        title: 'Month9',
        type: 'string',
      },
       M10SLAPercent: {
       
        title: 'Month10',
        type: 'string',
      },
       M11SLAPercent: {
        title: 'Month11',
        type: 'string',
      },
       M12SLAPercent: {
        title: 'Month12',
        type: 'string',
      },
       TargetPercentage:{
         title:'Target%',
         type: 'string',
       },
    },
  };


  constructor(private dbdatasService:DbdatasService, private modalService: NgbModal ) { }

    ngOnInit(){

        this.selectedId = 1;
        this.selectedType = new DBType();
        this.dbdatasService.getDBTypes().subscribe(result => {
        this.dbTypes = result as DBType[];
        this.selectedId = 1;
        this.selectedType = this.dbTypes[this.selectedId];
      }); 

    
      this.settings.columns.M1SLAPercent.title = 'JUN-17',
      this.settings.columns.M2SLAPercent.title = 'JUL-17',
      this.settings.columns.M3SLAPercent.title = 'AUG-17',
      this.settings.columns.M4SLAPercent.title = 'SEP-17',
      this.settings.columns.M5SLAPercent.title = 'OCT-17',
      this.settings.columns.M6SLAPercent.title = 'NOV-17',
      this.settings.columns.M7SLAPercent.title = 'DEC-17',
      this.settings.columns.M8SLAPercent.title = 'JAN-18',
      this.settings.columns.M9SLAPercent.title = 'FEB-18',
      this.settings.columns.M10SLAPercent.title = 'MAR-18',
      this.settings.columns.M11SLAPercent.title = 'APR-18',
      this.settings.columns.M12SLAPercent.title = 'MAY-18'
      this.getSLADashboardMonths(this.selectedId);

   
     }
      
  
   selectDashboard(value) {
    this.getSLADashboardMonths(value);    
  }

   getSLADashboardMonths(dashboardId) : void{
      this.dbdatasService.getSLADashboardMonths(dashboardId).subscribe(result => {
        this.DBDatas = new DBDatas;
           this.source.load(result);
  }, error => console.error(error));
}

}
  

