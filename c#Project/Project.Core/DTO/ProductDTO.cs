using Project.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string Description { get; set; }
        public double Cost { get; set; }
        public int QtyInStock { get; set; }
        public string ImgSource { get; set; }
        }
}