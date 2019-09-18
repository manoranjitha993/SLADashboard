import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Dashboard } from '../models/dashboard.model';
import { DashboardType } from '../models/dashboard-type.model';
import { DashboardDefinition } from '../models/dashboard-definition.model';
import { DashboardTier } from '../models/dashboard-tier.model';
import { DashboardData } from '../models/dashboard-data.model';
import { SlaData } from '../models/sla-data.model';
import { SlaDropdown } from '../models/sla-dropdown.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SlaInputService {
  dashboard: Observable<Dashboard>;

  selectedDashboardData: SlaData;
  dashboardList: DashboardData[];


  constructor(private http: HttpClient) { }

  getSLADataList(): Observable<SlaData[]> {
    let url = environment.BASE_URL + "SLAInput/GetSLADataList";
    return this.http.get<SlaData[]>(url, { responseType: 'json' });
  }

  getSLADropdowns(): Observable<SlaDropdown> {
    let url = environment.BASE_URL + "SLAInput/GetSLADropdowns";
    return this.http.get<SlaDropdown>(url, { responseType: 'json' });
  }

  saveSLAData(slaData: SlaData): Observable<number> {
    let sla = JSON.stringify(slaData);
    let url = environment.BASE_URL + "SLAInput/SaveSLAData";
    return this.http.post<number>(url, sla, httpOptions);
  }
 

  deleteSLAData(slaData: SlaData): Observable<string> {
    let sla = JSON.stringify(slaData);
    let url = environment.BASE_URL + "SLAInput/DeleteSLAData";
    return this.http.post<string>(url, sla, httpOptions);
  }

}
