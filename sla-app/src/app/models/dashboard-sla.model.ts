export class DashboardSla {
  SLAId: number;
  SLAName: string;
  SLATrend: string;
  SLATrendImage: string;
  SLATrendTitle: string;
  SLAComment: string;

  constructor() {
    this.SLAId = 0;
    this.SLAName = '';
    this.SLATrend = '';
    this.SLATrendImage = '';
    this.SLATrendTitle = '';
    this.SLAComment = '';
  }
}
