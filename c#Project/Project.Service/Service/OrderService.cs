using Project.Core;
using Project.Core.Data;
using Project.Core.DTO;
using Project.Core.Service;
using Project.Data.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Service.Service
{
    public class OrderService : IOrderService
    {
        public readonly IOrderData orderData;

        public OrderService(IOrderData _orderData)
        {
            orderData = _orderData;
        }

        public List<Order> GetAll()
        {
            return orderData.GetAll();
        }

        public Order GetById(int id)
        {
            return orderData.GetById(id);
        }

        public List<Order> GetByUserId(int id)
        {
            return orderData.GetByUserId(id);
        }

        public List<Order> GetByDate(DateTime date)
        {
            return orderData.GetByDate(date);
        }

        public async Task<Order> CreateOrder(OrderCreateDto orderDto)
        {
            var order = new Order
            {
                UserId = orderDto.UserId,
                TotalSum = orderDto.TotalSum
            };

            await orderData.CreateOrder(order, orderDto.Products);

            return order;
        }
    }
}
