using Project.Core;
using Project.Core.Data;
using Project.Core.Service;
using Project.Data.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Service.Service
{
    public class ProductService : IProductService
    {
        public readonly IProductData productData;

        public ProductService(IProductData _productData)
        {
            productData = _productData;
        }

        public List<Product> GetAll()
        {
            return productData.GetAll();
        }
        public Product GetById(int id)
        {   
            return productData.GetById(id);
        }
        public List<Product> GetByCategoryId(int id)
        {
            return productData.GetByCategoryId(id);
        }
        public List<Product> GetOutOfStock()
        {
            return productData.GetOutOfStock();
        }
        public void AddProduct(Product product)
        {
            productData.AddProduct(product);
        }
        public void DeleteProductById(int id)
        {
            productData.DeleteProductById(id);
        }
        public void UpdateProduct(int id, Product product)
        {
            productData.UpdateProduct(id, product);
        }
    }
}
