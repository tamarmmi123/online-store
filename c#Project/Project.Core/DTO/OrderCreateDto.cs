using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.DTO
{
     public class OrderCreateDto
    {
        public int UserId { get; set; }
        public double TotalSum { get; set; }
        public List<CreateProductOrderDto> Products { get; set; } = new();
    }
}
