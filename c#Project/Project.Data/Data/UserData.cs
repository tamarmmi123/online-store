using Microsoft.EntityFrameworkCore;
using Project.Core;
using Project.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Data.Data
{
    public class UserData : IUserData
    {
        public readonly DataContext dataContext;

        public UserData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public List<User> GetAll()
        {
            return dataContext.users.ToList();
        }

        public User GetByNameAndPasssword(string name, string password) 
        {
            return dataContext.users.FirstOrDefault(x => x.UserName == name && x.Password == password);
        }

        public User GetById(int id)
        {
            return dataContext.users.FirstOrDefault(x => x.Id == id);
        }

        public void AddUser(User user)
        {
            if (dataContext.users.Any(u => u.UserName == user.UserName))
            {
                throw new InvalidOperationException("Username already exists.");
            }
            user.Role = "user";
            dataContext.users.Add(user);
            dataContext.SaveChanges();
        }

        public void UpdateUser(int id, User user)
        {
            User u = dataContext.users.FirstOrDefault(x => x.Id == id)!;
            if(u != null)
            {
                u.UserName = user.UserName;
                u.Password = user.Password;
                u.FirstName = user.FirstName;
                u.LastName = user.LastName;
                u.PhoneNumber = user.PhoneNumber;
                u.Address = user.Address;
                u.Email = user.Email;
                dataContext.SaveChanges();
            }
        }

        public void DeleteUser(int id)
        {
            var user = dataContext.users.FirstOrDefault(x => x.Id == id);
            if (user != null)
            {
                dataContext.users.Remove(user);
                dataContext.SaveChanges();
            }
        }

        //ל JWT
        public async Task<User?> AuthenticateAsync(string username, string password)
        {
            return await dataContext.users
                .FirstOrDefaultAsync(u => u.UserName == username && u.Password == password);
        }
    }
}
