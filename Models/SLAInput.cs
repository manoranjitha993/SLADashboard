using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SLADashboardAPI.Models
{
    public class SLADropdown
    {
        public List<DashboardDropdownItem> DashboardItemList { get; set; }
        public List<SLADropdownItem> SLAItemList { get; set; }
        public List<TierDropdownItem> TierItemList { get; set; }

    }

    public class DashboardDropdownItem
    {
        public int DashboardId { get; set; }
        public string DashboardName { get; set; }
        public int DashboardParentId { get; set; }
        public int IsInputEnabled { get; set; }

    }


    public class SLADropdownItem
    {
        public int SLAId { get; set; }
        public string SLANumber { get; set; }
        public string SLADefinition { get; set; }
        public string SLA { get; set; }

    }


    public class TierDropdownItem
    {
        public int SLATierId { get; set; }
        public string SLATier { get; set; }


    }
}