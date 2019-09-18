using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using SLADashboardAPI.Models;
using System.Web.Http.Cors;

namespace SLADashboardAPI.Controllers
{
    [RoutePrefix("api/User")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        [System.Web.Http.HttpGet]
        [Route("GetUserData")]
        public User GetUserData()
        {
            try
            {
                var user = new User();
                var userLanId = LDAPUserInfo.GetUserLanId();

                if (!string.IsNullOrWhiteSpace(userLanId))
                {
                    user = this.GetUser(userLanId);
                    user.UserId = userLanId;
                    user.IsAdminUser = IsAdminUser(userLanId);
                }
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private bool IsAdminUser(string lanID)
        {
            bool isAdmin = false;
            SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["SLAConnection"].ConnectionString);
            using (SqlConnection conn = new SqlConnection())
            {
                SqlCommand command = new SqlCommand("usp_IsAdminUser", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@LanId", SqlDbType.VarChar);
                command.Parameters["@LanId"].Value = lanID;
                DataSet ds = new DataSet();
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = command;

                try
                {
                    da.Fill(ds);

                    foreach (DataRow dr in ds.Tables[0].AsEnumerable())
                    {
                        isAdmin = Convert.ToBoolean(dr["IsAdmin"].ToString());
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
            return isAdmin;
        }

        [System.Web.Http.HttpGet]
        [Route("GetUser")]
        public User GetUser(string lanID)
        {
            LDAPUserInfo userinfo = new LDAPUserInfo();
            User user = userinfo.GetADUser(lanID);
            return user;
        }
    }
}