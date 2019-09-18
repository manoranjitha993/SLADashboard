using SLADashboard.Models;
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

namespace SLADashboard.Controllers
{
    public class DashboardMonthController : ApiController
    {

        [RoutePrefix("api/DashboardMonth")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public class DashboardMonthsController : ApiController
        {

            [System.Web.Http.HttpGet]
            [Route("GetSLADashboardMonths")]

            public List<DBDatas> GetSLADashboardMonths(int dashboardId)

            {


                List<DBDatas> DBList = new List<DBDatas>();
                DBDatas DBData = new DBDatas();
                SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["SLAConnection"].ConnectionString);
                using (SqlConnection conn = new SqlConnection())
                {

                    SqlCommand command = new SqlCommand("usp_GetSLADashboardMonths", connection);
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
                            DBData = new DBDatas();
                            DBData.SLAId = Convert.ToInt32(dr["SLAId"].ToString());
                            DBData.SLATierId = Convert.ToInt32(dr["SLATierId"].ToString());
                            DBData.SLANumber = dr["SLANumber"].ToString();
                            DBData.SLADefinition = dr["SLADefinition"].ToString();
                            DBData.SLATier = dr["SLATier"].ToString();
                            DBData.M1SLAPercent = Convert.ToDecimal(dr["M1SLAPercent"].ToString());
                            DBData.M2SLAPercent = Convert.ToDecimal(dr["M2SLAPercent"].ToString());
                            DBData.M3SLAPercent = Convert.ToDecimal(dr["M3SLAPercent"].ToString());
                            DBData.M4SLAPercent = Convert.ToDecimal(dr["M4SLAPercent"].ToString());
                            DBData.M5SLAPercent = Convert.ToDecimal(dr["M5SLAPercent"].ToString());
                            DBData.M6SLAPercent = Convert.ToDecimal(dr["M6SLAPercent"].ToString());
                            DBData.M7SLAPercent = Convert.ToDecimal(dr["M7SLAPercent"].ToString());
                            DBData.M8SLAPercent = Convert.ToDecimal(dr["M8SLAPercent"].ToString());
                            DBData.M9SLAPercent = Convert.ToDecimal(dr["M9SLAPercent"].ToString());
                            DBData.M10SLAPercent = Convert.ToDecimal(dr["M10SLAPercent"].ToString());
                            DBData.M11SLAPercent = Convert.ToDecimal(dr["M11SLAPercent"].ToString());
                            DBData.M12SLAPercent = Convert.ToDecimal(dr["M12SLAPercent"].ToString());
                            DBData.TargetPercentage = Convert.ToDecimal(dr["TargetPercentage"].ToString());
                            DBList.Add(DBData);

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
                return DBList;
            }


            [System.Web.Http.HttpGet]
            [Route("GetDBTypeDropdown")]
            public List<DBType> GetDBTypeDropdown()   //no need
            {
                DBType dbType = new DBType();
                List<DBType> dbTypes = new List<DBType>();
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
                            dbType = new DBType();
                            dbType.DashboardId = Convert.ToInt32(dr["DashboardId"].ToString());
                            dbType.DashboardName = dr["DashboardName"].ToString();
                            dbType.DashboardParentId = Convert.ToInt32(dr["DashboardParentId"].ToString());
                            dbType.IsInputEnabled = Convert.ToInt32(dr["IsInputEnabled"].ToString());
                            dbTypes.Add(dbType);
                        }
                    }
                    catch (Exception ex)
                    {

                    }
                    finally
                    {
                        command.Dispose();
                        ds.Dispose();
                        da.Dispose();
                    }
                }
                return dbTypes;
            }


        }
    }
}






