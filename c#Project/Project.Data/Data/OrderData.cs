using Microsoft.EntityFrameworkCore;
using Project.Core;
using Project.Core.Data;
using Project.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Data.Data
{
    public class OrderData : IOrderData
    {
        public readonly DataContext dataContext;

        public OrderData(DataContext _dataContext)
        {
            dataContext = _dataContext;   
        }

        public List<Order> GetAll()
        {
            return dataContext.orders.Include(o => o.User).ToList();
        }

        public Order GetById(int id)
        {
            return dataContext.orders.Include(o => o.User).FirstOrDefault(x => x.Id == id);
        }


        public List<Order> GetByUserId(int userId)
        {
            var orders = dataContext.orders
                .Where(o => o.UserId == userId)
                .Include(o => o.User)
                .Include(o => o.OrderProducts)
                    .ThenInclude(op => op.Product)
                .ToList();

            return orders;
        }

        public List<Order> GetByDate(DateTime date)
        {
            return dataContext.orders.Where(x => x.OrderDate == date).Include(o => o.User).ToList();
        }

        public async Task CreateOrder(Order order, List<CreateProductOrderDto> products)
        {
            var orderProducts = new List<OrderProduct>();

            foreach (var item in products)
            {
                var product = await dataContext.products.FindAsync(item.Id);

                if (product == null)
                {
                    throw new InvalidOperationException($"Product with ID {item.Id} not found");
                }

                if (product.QtyInStock < item.Quantity)
                {
                    throw new InvalidOperationException($"Not enough stock for {product.ProductName}");
                }

                product.QtyInStock -= item.Quantity;

                orderProducts.Add(new OrderProduct
                {
                    ProductId = item.Id,
                    Quantity = item.Quantity,
                    Product = product
                });
            }

            order.OrderProducts = orderProducts;
            order.OrderDate = DateTime.UtcNow;

            dataContext.orders.Add(order);
            await dataContext.SaveChangesAsync();
        }
    }
}
