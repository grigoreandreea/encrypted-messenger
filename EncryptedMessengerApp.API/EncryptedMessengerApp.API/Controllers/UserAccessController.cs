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
            if (!ModelState.IsValid)
                return BadRequest();

            AuthenticationToken token = new AuthenticationToken();
            User user = db.Users.FirstOrDefault(u => u.PhoneNumber == userLogin.PhoneNumber);

            try
            {
                if (user != null && user.Password == userLogin.Password)
                {
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
        public IHttpActionResult Logout()
        {
            string authenticationToken;
            CookieHeaderValue cookie = Request.Headers.GetCookies("authentication-token").FirstOrDefault();
            if (cookie != null)
            {
                authenticationToken = cookie["authentication-token"].Value;
            }
            else
                return BadRequest();

            AuthenticationToken token = db.AuthenticationTokens.FirstOrDefault(a => a.GUID == authenticationToken);
            if (token == null)
            {
                return NotFound();
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
                    return Conflict();
                }
            }
            return Ok();
        }
    }
}
