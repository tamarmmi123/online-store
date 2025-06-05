using Project.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public double TotalSum { get; set; }
        public List<OrderProduct> OrderProducts { get; set; } = new();
    }
}
