using Project.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }

        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

        public string Email { get; set; }
        public ICollection<Order>? Orders { get; set; }
    }
}
