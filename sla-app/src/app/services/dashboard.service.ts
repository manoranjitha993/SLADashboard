import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Dashboard } from '../models/dashboard.model';
import { DashboardType } from '../models/dashboard-type.model';
import { SlaData } from '../models/sla-data.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  dashboard: Observable<Dashboard>;

  constructor(private http: HttpClient) { }

  getDashboardData(dashboardId): Observable<Dashboard> {
    let url = environment.BASE_URL + "Dashboard/GetDashboardData?dashboardId=" + dashboardId;
    return this.http.get<Dashboard>(url, { responseType: 'json' });
  }

   getDashboardTypes(): Observable<DashboardType[]> {
    return this.http.get<DashboardType[]>(environment.BASE_URL + "Dashboard/GetDashboardTypeDropdown",     //to get the dasboard dropdowns
      { responseType: 'json' });
  }

 

}
