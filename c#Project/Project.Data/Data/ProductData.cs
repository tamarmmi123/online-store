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
    public class ProductData : IProductData
    {
        public readonly DataContext dataContext;

        public ProductData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public List<Product> GetAll()
        {
            return dataContext.products.Include(p => p.Category).ToList();
        }

        public Product GetById(int id)
        {
            return dataContext.products.Include(p => p.Category).FirstOrDefault(x => x.Id == id);
        }

        public List<Product> GetByCategoryId(int id)
        {
            return dataContext.products.Where(x => x.CategoryId == id).Include(p => p.Category).ToList();
        }
        public List<Product> GetOutOfStock()
        {
            List<Product> products = new List<Product>();
            products = dataContext.products.Where(x => x.QtyInStock == 0).ToList();//.Include(p => p.Category).ToList();
            return products;
        }


        public void AddProduct(Product product)
        {
            dataContext.products.Add(product);
            dataContext.SaveChanges();
        }

        public void DeleteProductById(int id)
        {
            var product = dataContext.products.FirstOrDefault(x => x.Id == id);
            if (product != null)
            {
                dataContext.products.Remove(product);
                dataContext.SaveChanges();
            }
        }

        public void UpdateProduct(int id, Product product)
        {
            var p = dataContext.products.FirstOrDefault(x => x.Id == id);
            if (p != null)
            {
                p.ProductName = product.ProductName;
                p.CategoryId = product.CategoryId;
                p.Description = product.Description;
                p.Cost = product.Cost;
                p.QtyInStock = product.QtyInStock;
                p.ImgSource = product.ImgSource;
                dataContext.SaveChanges();
            }
        }
    }
}
