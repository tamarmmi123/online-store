using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Service
{
    public interface IProductService
    {
        public List<Product> GetAll();
        public Product GetById(int id);
        public List<Product> GetByCategoryId(int id);
        public List<Product> GetOutOfStock();
        public void AddProduct(Product product);
        public void DeleteProductById(int id);
        public void UpdateProduct(int id, Product product);
    }
}
