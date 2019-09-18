import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DBDatas } from '../models/DB-Data.model';
//import { DBItem } from '../models/DB-Item.model';
//import { DBSLA } from '../models/DB-SLA.model';
import { DBType } from '../models/DB-Type.model';
import { SlaData } from '../models/sla-data.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class DbdatasService {
    DBDatas: Observable<DBDatas[]>;

  constructor(private http: HttpClient) { }

   getSLADashboardMonths(dashboardId): Observable<DBDatas[]>{
      let url = environment.BASE_URL + "DashboardMonth/GetSLADashboardMonths?dashboardId=" + dashboardId;
       return this.http.get<DBDatas[]>(url, { responseType: 'json' });

   }

   getDBTypes(): Observable<DBType[]> {
    return this.http.get<DBType[]>(environment.BASE_URL + "DashboardMonth/GetDBTypeDropdown",    
      { responseType: 'json' });
  }




}
