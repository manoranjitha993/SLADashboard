using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SLADashboardAPI.Models
{
    public class Dashboard
    {
        public List<DashboardItem> DashboardItems { get; set; }
        public List<DashboardSla> DashboardSlas { get; set; }
        public List<DashboardItemMonthwise> DashboardItemsMonthwise { get; set; }
        public string Month1 { get; set; }
        public string Month2 { get; set; }
        public string Month3 { get; set; }

    }

    public class DashboardItem
    {
        public int SLAId { get; set; }
        public int SLATierId { get; set; }
        public string SLANumber { get; set; }
        public string SLADefinition { get; set; }
        public string SLATier { get; set; }
        public decimal M1SLAPercent { get; set; }
        public decimal M2SLAPercent { get; set; }
        public decimal M3SLAPercent { get; set; }
        public char M1SLAStatus { get; set; }
        public char M2SLAStatus { get; set; }
        public char M3SLAStatus { get; set; }
        public decimal TargetPercentage { get; set; }
        public string M1Comment { get; set; }
        public string M2Comment { get; set; }
        public string M3Comment { get; set; }

    }

    public class DashboardSla
    {
        public int SLAId { get; set; }
        public string SLAName { get; set; }
        public string SLATrend { get; set; }
        public string SLATrendImage { get; set; }
        public string SLATrendTitle { get; set; }
        public string SLAComment { get; set; }

    }

    public class DashboardItemMonthwise
    {
        public int SLAId { get; set; }
        public string SLAMonth { get; set; }
        public decimal Percent1 { get; set; }
        public decimal Percent2 { get; set; }
        public char P1SLAColor { get; set; }
        public char P2SLAColor { get; set; }
    }

    public class DashboardType
    {
        public int DashboardId { get; set; }
        public string DashboardName { get; set; }
        public int DashboardParentId { get; set; }
        public int IsInputEnabled { get; set; }

    }
}



























//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;

//namespace SLADashboardAPI.Models
//{
//    public class Dashboard
//    {
//        public List<DashboardItem> DashboardItems { get; set; }
//        public List<DashboardSla> DashboardSlas { get; set; }
//       // public List<DashboardItemMonthwise> DashboardItemsMonthwise { get; set; }
//        public string Month1 { get; set; }
//        public string Month2 { get; set; }
//        public string Month3 { get; set; }

//    }

//    public class DashboardItem
//    {
//        public int SLAId { get; set; }
//        public int SLATierId { get; set; }
//        public string SLANumber { get; set; }
//        public string SLADefinition { get; set; }
//        public string SLATier { get; set; }
//        public decimal M1SLAPercent { get; set; }
//        public decimal M2SLAPercent { get; set; }
//        public decimal M3SLAPercent { get; set; }
//        public char M1SLAStatus { get; set; }
//        public char M2SLAStatus { get; set; }
//        public char M3SLAStatus { get; set; }
//        public decimal TargetPercentage { get; set; }

//    }

//    public class DashboardSla
//    {
//        public int SLAId { get; set; }
//        public string SLAName { get; set; }
//        public string SLATrend { get; set; }
//        public string SLATrendImage { get; set; }
//        public string SLATrendTitle { get; set; }
//        public string SLAComment { get; set; }

//    }

//    //public class DashboardItemMonthwise
//    //{
//    //    public int SLAId { get; set; }
//    //    public string SLAMonth { get; set; }
//    //    public decimal Percent1 { get; set; }
//    //    public decimal Percent2 { get; set; }
//    //    public char P1SLAColor { get; set; }
//    //    public char P2SLAColor { get; set; }
//    //}

//    public class DashboardType
//    {
//        public int DashboardId { get; set; }
//        public string DashboardName { get; set; }
//        public int DashboardParentId { get; set; }
//        public int IsInputEnabled { get; set; }

//    }
//}