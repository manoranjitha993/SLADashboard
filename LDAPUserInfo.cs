using SLADashboardAPI.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.DirectoryServices;
using System.Linq;
using System.Web;

namespace SLADashboardAPI
{
    public class LDAPUserInfo
    {
        string server = string.Empty;
        string domainController = string.Empty;
        string domainServer = string.Empty;
        string defaultDomain = string.Empty;



        public LDAPUserInfo()
        {
            domainController = ConfigurationManager.AppSettings["DCName"];
            domainServer = ConfigurationManager.AppSettings["DCServer"];
            defaultDomain = ConfigurationManager.AppSettings["DCDefault"];
        }

        public static string GetUserLanId()
        {
            var remoteUser = "";
            var user = "";
            var environment = ConfigurationManager.AppSettings["Environment"];
            try
            {
                if (HttpContext.Current.Request.LogonUserIdentity != null)
                    remoteUser = HttpContext.Current.Request.LogonUserIdentity.Name;

                // impersonation check, only for DEV and QA
                var impersonate = false;
                if (HttpContext.Current.Request.UrlReferrer != null && HttpContext.Current.Request.UrlReferrer.Query != "")
                {
                    var query = HttpContext.Current.Request.UrlReferrer.ToString().ToLower();
                    impersonate = query.Contains("?user=");

                    if (impersonate)
                    {
                        if (environment == "DEV" || environment == "QA")
                        {
                            var tempUser = query.Split('=')[1];
                            if (tempUser.Length == 4)
                            {
                                remoteUser = string.Format(@"PGE\{0}", tempUser);
                            }
                            else if (tempUser.Length == 6)
                            {
                                remoteUser = string.Format(@"CTS\{0}", tempUser);
                            }
                        }
                    }
                }

                if (!string.IsNullOrWhiteSpace(remoteUser))
                {
                    var values = remoteUser.Split('\\');
                    if (values.Length == 2)
                    {
                        user = values[1].ToString();
                    }
                }
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public User GetADUser(string lanID)
        {
            try
            {
                User users = new User();
                try
                {

                    string pathNameDomain = string.Format("LDAP://{0}", domainServer);

                    var direcotyEntry = new DirectoryEntry(pathNameDomain);


                    var directorySearcher = new DirectorySearcher(direcotyEntry)
                    {
                        Filter = "(&(objectClass=user)(sAMAccountName=" + lanID + "))"
                    };

                    var searchResults = directorySearcher.FindAll();
                    SearchResult result;
                    if (searchResults != null)
                    {
                        for (int counter = 0; counter < searchResults.Count; counter++)
                        {
                            result = searchResults[counter];
                            if (result.Properties["samaccountname"].Count != 0 && result.Properties["givenname"].Count != 0 &&
                                  result.Properties["sn"].Count != 0 && result.Properties["title"].Count != 0 && result.Properties["mail"].Count != 0)
                            {
                                users.UserId = (String)result.Properties["samaccountname"][0];
                                users.UserName = (String)result.Properties["givenname"][0] + " " + (String)result.Properties["sn"][0];
                            }
                        }
                    }

                    direcotyEntry.Dispose();
                    directorySearcher.Dispose();
                    searchResults.Dispose();
                }
                catch (InvalidOperationException iOe)
                {
                }
                catch (NotSupportedException nSe)
                {
                }
                finally
                {
                }
                return users;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}