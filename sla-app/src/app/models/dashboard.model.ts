import { DashboardItem } from "./dashboard-item.model";
import { DashboardSla } from "./dashboard-sla.model";
import { DashboardItemMonthwise } from "./dashboard-item-monthwise.model";

export class Dashboard {
  DashboardItems: DashboardItem[];
  DashboardSlas: DashboardSla[];
  DashboardItemsMonthwise: DashboardItemMonthwise[];
  Month1: string;
  Month2: string;
  Month3: string;
}
