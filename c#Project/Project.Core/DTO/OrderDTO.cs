using Project.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public double TotalSum { get; set; }
        public List<ProductOrderDto> Products { get; set; } = new();
        public string? ShippingAddress { get; set; }
    }
}
