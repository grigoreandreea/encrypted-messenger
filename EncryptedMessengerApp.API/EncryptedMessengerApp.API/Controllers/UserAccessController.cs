using EncryptedMessengerApp.API.Models;
using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace EncryptedMessengerApp.API.Controllers
{
    public class UserAccessController : ApiController
    {
        private EncryptedMessengerEntities db = new EncryptedMessengerEntities();

        public HttpResponseMessage Login(UserLoginModel userLogin)
        {
            HttpResponseMessage response = new HttpResponseMessage();

            if (!ModelState.IsValid)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }

            AuthenticationToken token = new AuthenticationToken();
            try
            {
                if (db.Users.FirstOrDefault(u => u.PhoneNumber == userLogin.PhoneNumber) != null)
                {
                    response.StatusCode = HttpStatusCode.OK;
                    token.GUID = Guid.NewGuid().ToString();
                    token.ExpireDate = DateTime.Now.AddDays(1);
                    token.UserId = db.Users.First(u => u.PhoneNumber == userLogin.PhoneNumber).Id;
                    token.LoggedOut = false;
                    db.AuthenticationTokens.Add(token);
                    db.SaveChanges();
                }
                else
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }

            CookieHeaderValue cookie = new CookieHeaderValue("authentication-token", token.GUID);
            cookie.Expires = DateTimeOffset.Now.AddDays(1);
            cookie.Domain = Request.RequestUri.Host;
            cookie.Path = "/";

            response.Headers.AddCookies(new CookieHeaderValue[] { cookie });
            return response;
        }

        public HttpResponseMessage Logout()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            string authenticationToken;
            CookieHeaderValue cookie = Request.Headers.GetCookies("authentication-token").FirstOrDefault();
            if (cookie != null)
            {
                authenticationToken = cookie["authentication-token"].Value;
            }
            else
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;

            }

            AuthenticationToken token = db.AuthenticationTokens.FirstOrDefault(a => a.GUID == authenticationToken);
            if (token == null)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }
            else
            {
                token.LoggedOut = true;
                db.Entry(token).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch(Exception ex)
                {
                    response.StatusCode = HttpStatusCode.Conflict;
                    return response;
                }
            }
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}
