using Project.Core;
using Project.Core.Data;
using Project.Core.Service;
using Project.Data.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Project.Service.Service
{
    public class UserService : IUserService
    {
        public readonly IUserData userData;

        public UserService(IUserData _userData)
        {
            userData = _userData;
        }

        public List<User> GetAll()
        {
            return userData.GetAll();
        }

        public User GetByNameAndPasssword(string name, string password) {
            return userData.GetByNameAndPasssword(name, password);
        }
        public User GetById(int id)
        {
            return userData.GetById(id);
        }

        public void AddUser(User user)
        {
            userData.AddUser(user);
        }

        public void UpdateUser(int id, User user)
        {
            userData.UpdateUser(id, user);
        }

        public void DeleteUser(int id)
        {
            userData.DeleteUser(id);
        }

        //ל JWT
        public Task<User?> AuthenticateAsync(string username, string password)
        {
            return userData.AuthenticateAsync(username, password);
        }
    }
}
