using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SLADashboard.Models
{
        public class DBDatas
        {
            public int SLAId { get; set; }
            public int SLATierId { get; set; }
            public string SLANumber { get; set; }
            public string SLADefinition { get; set; }
            public string SLATier { get; set; }
            public decimal M1SLAPercent { get; set; }
            public decimal M2SLAPercent { get; set; }
            public decimal M3SLAPercent { get; set; }
            public decimal M4SLAPercent { get; set; }
            public decimal M5SLAPercent { get; set; }
            public decimal M6SLAPercent { get; set; }
            public decimal M7SLAPercent { get; set; }
            public decimal M8SLAPercent { get; set; }
            public decimal M9SLAPercent { get; set; }
            public decimal M10SLAPercent { get; set; }
            public decimal M11SLAPercent { get; set; }
            public decimal M12SLAPercent { get; set; }
            public decimal TargetPercentage { get; set; }

        }

        public class DBType
        {
            public int DashboardId { get; set; }
            public string DashboardName { get; set; }
            public int DashboardParentId { get; set; }
            public int IsInputEnabled { get; set; }

        }





    }




