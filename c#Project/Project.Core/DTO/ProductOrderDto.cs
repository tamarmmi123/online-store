using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.DTO
{
    public class ProductOrderDto
    {
        public int Id { get; set; }
        public string? ProductName { get; set; } 
        public double Cost { get; set; }
        public string? ImgSource { get; set; }
        public int Quantity { get; set; }
    }
}
