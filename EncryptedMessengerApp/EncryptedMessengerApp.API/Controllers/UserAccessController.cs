using EncryptedMessengerApp.API.Models;
using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Security.Cryptography;
using System.Text;

namespace EncryptedMessengerApp.API.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class UserAccessController : ApiController
    {
        private EncryptedMessengerEntities db = new EncryptedMessengerEntities();
        private SHA256 sha256Hash = SHA256.Create();

        // POST: api/login/Login + PhoneNo & Password
        public IHttpActionResult Login(UserLoginModel userLogin)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            AuthenticationToken token = new AuthenticationToken();
            User user = db.Users.FirstOrDefault(u => u.PhoneNumber == userLogin.PhoneNumber);

            try
            {
                if (user != null && user.Password == Encoding.UTF8.GetString(sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(userLogin.Password))))
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
        [HttpGet]
        public IHttpActionResult Logout(Guid id)
        {

            AuthenticationToken token = db.AuthenticationTokens.FirstOrDefault(a => a.GUID == id.ToString());
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
