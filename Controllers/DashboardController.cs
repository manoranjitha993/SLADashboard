using SLADashboardAPI.Models;

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SLADashboardAPI.Controllers
{
    [RoutePrefix("api/Dashboard")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DashboardController : ApiController
    {
        [System.Web.Http.HttpGet]
        [Route("GetDashboardData")]
        public Dashboard GetDashboardData(int dashboardId)
        {
            Dashboard dashboard = new Dashboard();
            List<DashboardItem> dashboardItems = new List<DashboardItem>();
            DashboardItem dashboardItem = new DashboardItem();
            List<DashboardSla> dashboardSlas = new List<DashboardSla>();
            DashboardSla dashboardSla = new DashboardSla();
            SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["SLAConnection"].ConnectionString);
            using (SqlConnection conn = new SqlConnection())
            {

                SqlCommand command = new SqlCommand("usp_GetSLADashboard", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@DashboardId", SqlDbType.Int);
                command.Parameters["@DashboardId"].Value = dashboardId;
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = command;

                try
                {
                    da.Fill(ds);

                    foreach (DataRow dr in ds.Tables[0].AsEnumerable())
                    {
                        dashboardItem = new DashboardItem();
                        dashboardItem.SLAId = Convert.ToInt32(dr["SLAId"].ToString());
                        dashboardItem.SLATierId = Convert.ToInt32(dr["SLATierId"].ToString());
                        dashboardItem.SLANumber = dr["SLANumber"].ToString();
                        dashboardItem.SLADefinition = dr["SLADefinition"].ToString();
                        dashboardItem.SLATier = dr["SLATier"].ToString();
                        dashboardItem.M1SLAPercent = Convert.ToDecimal(dr["M1SLAPercent"].ToString());
                        dashboardItem.M2SLAPercent = Convert.ToDecimal(dr["M2SLAPercent"].ToString());
                        dashboardItem.M3SLAPercent = Convert.ToDecimal(dr["M3SLAPercent"].ToString());
                        dashboardItem.TargetPercentage = Convert.ToDecimal(dr["TargetPercentage"].ToString());
                        dashboardItem.M1SLAStatus = Convert.ToChar(dr["M1SLAStatus"].ToString());
                        dashboardItem.M2SLAStatus = Convert.ToChar(dr["M2SLAStatus"].ToString());
                        dashboardItem.M3SLAStatus = Convert.ToChar(dr["M3SLAStatus"].ToString());
                        dashboardItem.M1Comment = dr["M1Comment"].ToString();
                        dashboardItem.M2Comment = dr["M2Comment"].ToString();
                        dashboardItem.M3Comment = dr["M3Comment"].ToString();
                        dashboardItems.Add(dashboardItem);

                    }

                    foreach (DataRow dr in ds.Tables[1].AsEnumerable())
                    {
                        dashboardSla = new DashboardSla();
                        dashboardSla.SLAId = Convert.ToInt32(dr["SLAId"].ToString());
                        dashboardSla.SLAName = dr["SLAName"].ToString();
                        dashboardSla.SLATrend = dr["SLATrend"].ToString();
                        dashboardSla.SLATrendImage = dr["SLATrendImage"].ToString();
                        dashboardSla.SLATrendTitle = dr["SLATrendTitle"].ToString();
                        dashboardSla.SLAComment = dr["SLAComment"].ToString();
                        dashboardSlas.Add(dashboardSla);
                    }

                    dashboard.DashboardItems = dashboardItems;
                    dashboard.DashboardSlas = dashboardSlas;
                    dashboard.Month1 = ds.Tables[2].Rows[0]["Month1"].ToString();
                    dashboard.Month2 = ds.Tables[2].Rows[0]["Month2"].ToString();
                    dashboard.Month3 = ds.Tables[2].Rows[0]["Month3"].ToString();

                    dashboard.DashboardItemsMonthwise = GetSecurityAndQualityData(dashboard.DashboardItems, dashboard.Month1, dashboard.Month2, dashboard.Month3);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    command.Dispose();
                    ds.Dispose();
                    da.Dispose();
                }
            }
            return dashboard;
        }

        private List<DashboardItemMonthwise> GetSecurityAndQualityData(List<DashboardItem> dashboardItems, string month1, string month2, string month3)
        {
            List<DashboardItemMonthwise> dashboardItemsMonthwise = new List<DashboardItemMonthwise>();
            DashboardItemMonthwise dashboardItemMonthwise;

            dashboardItemMonthwise = new DashboardItemMonthwise();
            dashboardItemMonthwise.SLAId = 4;
            dashboardItemMonthwise.SLAMonth = month1;
            dashboardItemMonthwise.Percent1 = dashboardItems.Where(x => x.SLAId == 4 && x.SLATierId == 7).FirstOrDefault().M1SLAPercent;
            dashboardItemMonthwise.Percent2 = dashboardItems.Where(x => x.SLAId == 4 && x.SLATierId == 8).FirstOrDefault().M1SLAPercent;
            dashboardItemMonthwise.P1SLAColor = dashboardItems.Where(x => x.SLAId == 4 && x.SLATierId == 7).FirstOrDefault().M1SLAStatus;
            dashboardItemMonthwise.P2SLAColor = dashboardItems.Where(x => x.SLAId == 4 && x.SLATierId == 8).FirstOrDefault().M1SLAStatus;
            dashboardItemsMonthwise.Add(dashboardItemMonthwise);

            dashboardItemMonthwise = new DashboardItemMonthwise();
            dashboardItemMonthwise.SLAId = 4;
            dashboardItemMonthwise.SLAMonth = month2;
            dashboardItemMonthwise.Percent1 = dashboardItems.Where(x => x.SLAId == 4 && x.SLATierId == 7).FirstOrDefault().M2SLAPercent;
            dashboardItemMonthwise.Percent2 = dashboardItems.Where(x => x.SLAId == 4 && x.SLATierId == 8).FirstOrDefault().M2SLAPercent;
            dashboardItemMonthwise.P1SLAColor = dashboardItems.Where(x => x.SLAId == 4 && x.SLATierId == 7).FirstOrDefault().M2SLAStatus;
            dashboardItemMonthwise.P2SLAColor = dashboardItems.Where(x => x.SLAId == 4 && x.SLATierId == 8).FirstOrDefault().M2SLAStatus;
            dashboardItemsMonthwise.Add(dashboardItemMonthwise);

            dashboardItemMonthwise = new DashboardItemMonthwise();
            dashboardItemMonthwise.SLAId = 4;
            dashboardItemMonthwise.SLAMonth = month3;
            dashboardItemMonthwise.Percent1 = dashboardItems.Where(x => x.SLAId == 4 && x.SLATierId == 7).FirstOrDefault().M3SLAPercent;
            dashboardItemMonthwise.Percent2 = dashboardItems.Where(x => x.SLAId == 4 && x.SLATierId == 8).FirstOrDefault().M3SLAPercent;
            dashboardItemMonthwise.P1SLAColor = dashboardItems.Where(x => x.SLAId == 4 && x.SLATierId == 7).FirstOrDefault().M3SLAStatus;
            dashboardItemMonthwise.P2SLAColor = dashboardItems.Where(x => x.SLAId == 4 && x.SLATierId == 8).FirstOrDefault().M3SLAStatus;
            dashboardItemsMonthwise.Add(dashboardItemMonthwise);

            dashboardItemMonthwise = new DashboardItemMonthwise();
            dashboardItemMonthwise.SLAId = 5;
            dashboardItemMonthwise.SLAMonth = month1;
            dashboardItemMonthwise.Percent1 = dashboardItems.Where(x => x.SLAId == 5 && x.SLATierId == 7).FirstOrDefault().M1SLAPercent;
            dashboardItemMonthwise.Percent2 = dashboardItems.Where(x => x.SLAId == 5 && x.SLATierId == 8).FirstOrDefault().M1SLAPercent;
            dashboardItemMonthwise.P1SLAColor = dashboardItems.Where(x => x.SLAId == 5 && x.SLATierId == 7).FirstOrDefault().M1SLAStatus;
            dashboardItemMonthwise.P2SLAColor = dashboardItems.Where(x => x.SLAId == 5 && x.SLATierId == 8).FirstOrDefault().M1SLAStatus;
            dashboardItemsMonthwise.Add(dashboardItemMonthwise);

            dashboardItemMonthwise = new DashboardItemMonthwise();
            dashboardItemMonthwise.SLAId = 5;
            dashboardItemMonthwise.SLAMonth = month2;
            dashboardItemMonthwise.Percent1 = dashboardItems.Where(x => x.SLAId == 5 && x.SLATierId == 7).FirstOrDefault().M2SLAPercent;
            dashboardItemMonthwise.Percent2 = dashboardItems.Where(x => x.SLAId == 5 && x.SLATierId == 8).FirstOrDefault().M2SLAPercent;
            dashboardItemMonthwise.P1SLAColor = dashboardItems.Where(x => x.SLAId == 5 && x.SLATierId == 7).FirstOrDefault().M2SLAStatus;
            dashboardItemMonthwise.P2SLAColor = dashboardItems.Where(x => x.SLAId == 5 && x.SLATierId == 8).FirstOrDefault().M2SLAStatus;
            dashboardItemsMonthwise.Add(dashboardItemMonthwise);

            dashboardItemMonthwise = new DashboardItemMonthwise();
            dashboardItemMonthwise.SLAId = 5;
            dashboardItemMonthwise.SLAMonth = month3;
            dashboardItemMonthwise.Percent1 = dashboardItems.Where(x => x.SLAId == 5 && x.SLATierId == 7).FirstOrDefault().M3SLAPercent;
            dashboardItemMonthwise.Percent2 = dashboardItems.Where(x => x.SLAId == 5 && x.SLATierId == 8).FirstOrDefault().M3SLAPercent;
            dashboardItemMonthwise.P1SLAColor = dashboardItems.Where(x => x.SLAId == 5 && x.SLATierId == 7).FirstOrDefault().M3SLAStatus;
            dashboardItemMonthwise.P2SLAColor = dashboardItems.Where(x => x.SLAId == 5 && x.SLATierId == 8).FirstOrDefault().M3SLAStatus;
            dashboardItemsMonthwise.Add(dashboardItemMonthwise);

            dashboardItemMonthwise = new DashboardItemMonthwise();
            dashboardItemMonthwise.SLAId = 6;
            dashboardItemMonthwise.SLAMonth = month1;
            dashboardItemMonthwise.Percent1 = dashboardItems.Where(x => x.SLAId == 6).FirstOrDefault().M1SLAPercent;
            dashboardItemMonthwise.P1SLAColor = dashboardItems.Where(x => x.SLAId == 6).FirstOrDefault().M1SLAStatus;
            dashboardItemsMonthwise.Add(dashboardItemMonthwise);

            dashboardItemMonthwise = new DashboardItemMonthwise();
            dashboardItemMonthwise.SLAId = 6;
            dashboardItemMonthwise.SLAMonth = month2;
            dashboardItemMonthwise.Percent1 = dashboardItems.Where(x => x.SLAId == 6).FirstOrDefault().M2SLAPercent;
            dashboardItemMonthwise.P1SLAColor = dashboardItems.Where(x => x.SLAId == 6).FirstOrDefault().M2SLAStatus;
            dashboardItemsMonthwise.Add(dashboardItemMonthwise);

            dashboardItemMonthwise = new DashboardItemMonthwise();
            dashboardItemMonthwise.SLAId = 6;
            dashboardItemMonthwise.SLAMonth = month3;
            dashboardItemMonthwise.Percent1 = dashboardItems.Where(x => x.SLAId == 6).FirstOrDefault().M3SLAPercent;
            dashboardItemMonthwise.P1SLAColor = dashboardItems.Where(x => x.SLAId == 6).FirstOrDefault().M3SLAStatus;
            dashboardItemsMonthwise.Add(dashboardItemMonthwise);

            dashboardItemMonthwise = new DashboardItemMonthwise();
            dashboardItemMonthwise.SLAId = 7;
            dashboardItemMonthwise.SLAMonth = month1;
            dashboardItemMonthwise.Percent1 = dashboardItems.Where(x => x.SLAId == 7).FirstOrDefault().M1SLAPercent;
            dashboardItemMonthwise.P1SLAColor = dashboardItems.Where(x => x.SLAId == 7).FirstOrDefault().M1SLAStatus;
            dashboardItemsMonthwise.Add(dashboardItemMonthwise);

            dashboardItemMonthwise = new DashboardItemMonthwise();
            dashboardItemMonthwise.SLAId = 7;
            dashboardItemMonthwise.SLAMonth = month2;
            dashboardItemMonthwise.Percent1 = dashboardItems.Where(x => x.SLAId == 7).FirstOrDefault().M2SLAPercent;
            dashboardItemMonthwise.P1SLAColor = dashboardItems.Where(x => x.SLAId == 7).FirstOrDefault().M2SLAStatus;
            dashboardItemsMonthwise.Add(dashboardItemMonthwise);

            dashboardItemMonthwise = new DashboardItemMonthwise();
            dashboardItemMonthwise.SLAId = 7;
            dashboardItemMonthwise.SLAMonth = month3;
            dashboardItemMonthwise.Percent1 = dashboardItems.Where(x => x.SLAId == 7).FirstOrDefault().M3SLAPercent;
            dashboardItemMonthwise.P1SLAColor = dashboardItems.Where(x => x.SLAId == 7).FirstOrDefault().M3SLAStatus;
            dashboardItemsMonthwise.Add(dashboardItemMonthwise);

            return dashboardItemsMonthwise;
        }

        [System.Web.Http.HttpGet]
        [Route("GetDashboardTypeDropdown")]
        public List<DashboardType> GetDashboardTypeDropdown()
        {
            DashboardType dashboardType = new DashboardType();
            List<DashboardType> dashboardTypes = new List<DashboardType>();
            SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["SLAConnection"].ConnectionString);
            using (SqlConnection conn = new SqlConnection())
            {
                SqlCommand command = new SqlCommand("usp_GetSLADashboardTypes", connection);
                command.CommandType = CommandType.StoredProcedure;
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = command;

                try
                {
                    da.Fill(ds);

                    foreach (DataRow dr in ds.Tables[0].AsEnumerable())
                    {
                        dashboardType = new DashboardType();
                        dashboardType.DashboardId = Convert.ToInt32(dr["DashboardId"].ToString());
                        dashboardType.DashboardName = dr["DashboardName"].ToString();
                        dashboardType.DashboardParentId = Convert.ToInt32(dr["DashboardParentId"].ToString());
                        dashboardType.IsInputEnabled = Convert.ToInt32(dr["IsInputEnabled"].ToString());
                        dashboardTypes.Add(dashboardType);
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    command.Dispose();
                    ds.Dispose();
                    da.Dispose();
                }
            }
            return dashboardTypes;
        }
    }
}
