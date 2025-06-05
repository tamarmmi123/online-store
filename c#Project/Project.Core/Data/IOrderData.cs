using Project.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Data
{
    public interface IOrderData
    {
        public List<Order> GetAll();

        public Order GetById(int id);

        public List<Order> GetByUserId(int userId);

        public List<Order> GetByDate(DateTime date);
        public Task CreateOrder(Order order, List<CreateProductOrderDto> products);

    }
}
