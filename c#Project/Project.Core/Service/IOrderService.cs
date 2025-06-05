using Project.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Service
{
    public interface IOrderService
    {
        public List<Order> GetAll();

        public Order GetById(int id);

        public List<Order> GetByUserId(int userId);

        public List<Order> GetByDate(DateTime date);
        public Task<Order> CreateOrder(OrderCreateDto orderDto);
    }
}
