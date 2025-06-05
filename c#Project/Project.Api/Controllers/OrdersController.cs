using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Core;
using Project.Core.DTO;
using Project.Core.Service;
using Project.Data;


namespace Project.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService orderService;
        private readonly IMapper mapper;

        public OrdersController(IMapper _mapper, IOrderService _orderService)
        {
            orderService = _orderService;
            mapper = _mapper;
        }

        // GET: api/<OrdersController>
        //חסימת פונקציות לשימוש מנהל בלבד
        [Authorize]
        [HttpGet]
        public List<OrderDTO> Get()
        {
            return mapper.Map<List<OrderDTO>>(orderService.GetAll());
        }

        // GET api/<OrdersController>/5
        //הוספת סטטוס
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            Order o = orderService.GetById(id);
            if (o == null)
                return NotFound();
            return Ok(mapper.Map<OrderDTO>(o));
        }

        [HttpGet("by-userId/{id}")]
        public List<OrderDTO> GetByUserId(int id)
        {
            return mapper.Map<List<OrderDTO>>(orderService.GetByUserId(id));
        }

        [HttpGet("by-date/{date}")]
        public List<OrderDTO> GetByDate(DateTime date)
        {
            return mapper.Map<List<OrderDTO>>(orderService.GetByDate(date));
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDto orderDto)
        {
            if (orderDto == null || orderDto.Products == null || !orderDto.Products.Any())
            {
                return BadRequest("Invalid order data");
            }

            try
            {
                var createdOrder = await orderService.CreateOrder(orderDto);
                return Ok(createdOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while creating the order");
            }
        }
    }
}
