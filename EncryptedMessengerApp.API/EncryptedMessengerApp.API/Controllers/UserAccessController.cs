using EncryptedMessengerApp.API.Models;
using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EncryptedMessengerApp.API.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class UserAccessController : ApiController
    {
        private EncryptedMessengerEntities db = new EncryptedMessengerEntities();

        // POST: api/login/Login + PhoneNo & Password
        public IHttpActionResult Login(UserLoginModel userLogin)
        {
            HttpResponseMessage response = new HttpResponseMessage();

            if (!ModelState.IsValid)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                return BadRequest();
            }

            AuthenticationToken token = new AuthenticationToken();
            var user = db.Users.FirstOrDefault(u => u.PhoneNumber == userLogin.PhoneNumber);

            try
            {
                if (user != null && user.Password == userLogin.Password)
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
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Ok(new { token= token.GUID, expireDate= token.ExpireDate, firstName= user.FirstName});
        }
        
        // POST: api/login/Logout + header with GUID & user Id
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
