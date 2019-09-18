using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SLADashboardAPI.Models
{
    public class SLAData
    {
        public int SLADataId { get; set; }
        public int DashboardId { get; set; }
        public int SLAId { get; set; }
        public int SLATierId { get; set; }
        public string DashboardName { get; set; }
        public string SLAName { get; set; }
        public string SLATier { get; set; }
        public int SLAMonth { get; set; }
        public string SLAMonthName { get; set; }
        public int SLAYear { get; set; }
        public decimal SLAMet { get; set; }
        public decimal SLANotMet { get; set; }
        public string SLAComment { get; set; }
    }
}