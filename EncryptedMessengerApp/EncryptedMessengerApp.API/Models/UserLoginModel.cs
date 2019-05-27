using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EncryptedMessengerApp.API.Models
{
    public class UserLoginModel
    {
        public string PhoneNumber { get; private set; }

        public string Password { get; private set; }

        public UserLoginModel(string phoneNumber, string password)
        {
            PhoneNumber = phoneNumber;
            Password = password;
        }
    }
}