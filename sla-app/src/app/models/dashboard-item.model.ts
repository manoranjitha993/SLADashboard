export class DashboardItem {
  SLAId: number;
  SLATierId: number;
  SLANumber: string;
  SLADefinition: string;
  SLATier: string;
  M1SLAPercent: number;
  M2SLAPercent: number;
  M3SLAPercent: number;
  M1SLAStatus : string;
  M2SLAStatus : string;
  M3SLAStatus : string;
  M1Comment : string;
  M2Comment : string;
  M3Comment : string;
  TargetPercentage: number;

  constructor() {
    this.SLAId = 0;
    this.SLATierId = 0;
    this.SLANumber = '';
    this.SLADefinition = '';
    this.SLATier = '';
    this.M1SLAPercent = 0;
    this.M2SLAPercent = 0;
    this.M3SLAPercent = 0;
    this.M1SLAStatus = '';
    this.M2SLAStatus = '';
    this.M3SLAStatus = '';
    this.TargetPercentage = 0;
  }
}
