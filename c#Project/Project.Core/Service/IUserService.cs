using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Service
{
    public interface IUserService
    {
        public List<User> GetAll();
        public User GetByNameAndPasssword(string name, string password);
        public User GetById(int id);
        public void AddUser(User user);
        public void UpdateUser(int id, User user);
        public void DeleteUser(int id);
        //ל JWT
        Task<User?> AuthenticateAsync(string username, string password);
    }
}
