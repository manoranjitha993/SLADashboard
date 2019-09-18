using SLADashboardAPI.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SLADashboardAPI.Controllers
{

    [RoutePrefix("api/SLAInput")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SLAInputController : ApiController
    {
      
        [System.Web.Http.HttpGet]
        [Route("GetSLADataList")]
        public List<SLAData> GetSLADataList()
        {
            List<SLAData> slaDataList = new List<SLAData>();
            SLAData slaDataItem = new SLAData();
            SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["SLAConnection"].ConnectionString);
            using (SqlConnection conn = new SqlConnection())
            {

                SqlCommand command = new SqlCommand("usp_GetSLADataList", connection);
                command.CommandType = CommandType.StoredProcedure;
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = command;

                try
                {
                    da.Fill(ds);

                    foreach (DataRow dr in ds.Tables[0].AsEnumerable())
                    {
                        slaDataItem = new SLAData();
                        slaDataItem.SLADataId = Convert.ToInt32(dr["SLADataId"].ToString());
                        slaDataItem.DashboardId = Convert.ToInt32(dr["DashboardId"].ToString());
                        slaDataItem.SLAId = Convert.ToInt32(dr["SLAId"].ToString());
                        slaDataItem.SLATierId = Convert.ToInt32(dr["SLATierId"].ToString());
                        slaDataItem.DashboardName = dr["DashboardName"].ToString();
                        slaDataItem.SLAName = dr["SLAName"].ToString();
                        slaDataItem.SLATier = dr["SLATier"].ToString();
                        slaDataItem.SLAMonth = Convert.ToInt32(dr["SLAMonth"].ToString());
                        slaDataItem.SLAMonthName = dr["SLAMonthName"].ToString();
                        slaDataItem.SLAYear = Convert.ToInt32(dr["SLAYear"].ToString());
                        slaDataItem.SLAMet = Convert.ToDecimal(dr["SLAMet"].ToString());
                        slaDataItem.SLANotMet = Convert.ToDecimal(dr["SLANotMet"].ToString());
                        slaDataItem.SLAComment = dr["SLAComment"].ToString();
                        slaDataList.Add(slaDataItem);

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
            return slaDataList;
        }

        [System.Web.Http.HttpGet]
        [Route("GetSLADropdowns")]
        public SLADropdown GetDashboardTypeDropdown()
        {
            SLADropdown dropdowns = new SLADropdown();
            List<DashboardDropdownItem> dashboardDropdownItems = new List<DashboardDropdownItem>();
            DashboardDropdownItem dashboardDropdownItem = new DashboardDropdownItem();
            List<SLADropdownItem> slaDropdownItems = new List<SLADropdownItem>();
            SLADropdownItem slaDropdownItem = new SLADropdownItem();
            List<TierDropdownItem> tierDropdownItems = new List<TierDropdownItem>();
            TierDropdownItem tierDropdownItem = new TierDropdownItem();
            SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["SLAConnection"].ConnectionString);
            using (SqlConnection conn = new SqlConnection())
            {
                SqlCommand command = new SqlCommand("usp_GetSLADropdowns", connection);
                command.CommandType = CommandType.StoredProcedure;
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = command;

                try
                {
                    da.Fill(ds);

                    foreach (DataRow dr in ds.Tables[0].AsEnumerable())
                    {
                        dashboardDropdownItem = new DashboardDropdownItem();
                        dashboardDropdownItem.DashboardId = Convert.ToInt32(dr["DashboardId"].ToString());
                        dashboardDropdownItem.DashboardName = dr["DashboardName"].ToString();
                        dashboardDropdownItem.DashboardParentId = Convert.ToInt32(dr["DashboardParentId"].ToString());
                        dashboardDropdownItems.Add(dashboardDropdownItem);
                    }

                    foreach (DataRow dr in ds.Tables[1].AsEnumerable())
                    {
                        slaDropdownItem = new SLADropdownItem();
                        slaDropdownItem.SLAId = Convert.ToInt32(dr["SLAId"].ToString());
                        slaDropdownItem.SLANumber = dr["SLANumber"].ToString();
                        slaDropdownItem.SLADefinition = dr["SLADefinition"].ToString();
                        slaDropdownItem.SLA = dr["SLA"].ToString();
                        slaDropdownItems.Add(slaDropdownItem);
                    }

                    foreach (DataRow dr in ds.Tables[2].AsEnumerable())
                    {
                        tierDropdownItem = new TierDropdownItem();
                        tierDropdownItem.SLATierId = Convert.ToInt32(dr["SLATierId"].ToString());
                        tierDropdownItem.SLATier = dr["SLATier"].ToString();
                        tierDropdownItems.Add(tierDropdownItem);
                    }

                    dropdowns.DashboardItemList = dashboardDropdownItems;
                    dropdowns.SLAItemList = slaDropdownItems;
                    dropdowns.TierItemList = tierDropdownItems;
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
            return dropdowns;
        }

        [System.Web.Http.HttpPost]
        [Route("SaveSLAData")]
       
        public int SaveSLAData(SLAData slaData)

        {

           // int parsedInt;
            int result = 0;
            SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["SLAConnection"].ConnectionString);
            using (SqlConnection conn = new SqlConnection())
            {
                SqlCommand command = new SqlCommand("usp_SaveSLAData", connection);
                command.CommandType = CommandType.StoredProcedure;

                try
                {
                   
                    command.Parameters.AddWithValue("@SLADataId", slaData.SLADataId);
                    command.Parameters.AddWithValue("@DashboardId", slaData.DashboardId);
                    command.Parameters.AddWithValue("@SLAId", slaData.SLAId);
                    command.Parameters.AddWithValue("@SLATierId", slaData.SLATierId);
                    command.Parameters.AddWithValue("@SLAYear", slaData.SLAYear);
                    command.Parameters.AddWithValue("@SLAMonth", slaData.SLAMonth);
                    command.Parameters.AddWithValue("@SLAMet", slaData.SLAMet);
                    command.Parameters.AddWithValue("@SLANotMet", slaData.SLANotMet);
                    command.Parameters.AddWithValue("@SLAComment", slaData.SLAComment);
                    command.Parameters.AddWithValue("@User", LDAPUserInfo.GetUserLanId());
                    connection.Open();
                    command.Parameters.Add("@ReturnCode", SqlDbType.Int, 2);
                    command.Parameters["@ReturnCode"].Direction = ParameterDirection.Output;
                    command.ExecuteNonQuery();
                    int x = (int)command.Parameters["@ReturnCode"].Value;
   
                    if (x == 1)
                    {
                        result = 1;
                    }
                    else
                    {
                        result = 0;
                    }

                }
                catch (Exception ex)
                {                  
                   throw ex;     

                }
               
                finally
                {
                    connection.Close();
                }
                
            }
              return result;

        }

        [System.Web.Http.HttpPost]
        [Route("DeleteSLAData")]
        public void DeleteSLAData(SLAData slaData)
        {
            SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["SLAConnection"].ConnectionString);
            using (SqlConnection conn = new SqlConnection())
            {
                SqlCommand command = new SqlCommand("usp_DeleteSLAData", connection);
                command.CommandType = CommandType.StoredProcedure;

                try
                {
                    command.Parameters.AddWithValue("@SLADataId", slaData.SLADataId);
                    command.Parameters.AddWithValue("@User", LDAPUserInfo.GetUserLanId());
                    connection.Open();
                    command.ExecuteNonQuery();

                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }

}