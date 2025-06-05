using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.Core;
using Project.Core.DTO;
using Project.Core.Service;


namespace Project.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService productService;
        private readonly IMapper mapper;

        public ProductsController(IProductService _productService, IMapper _mapper)
        {
            productService = _productService;
            mapper = _mapper;
        }

        // GET: api/<ProductsController>
        [HttpGet]
        public List<ProductDTO> Get()
        {
            return mapper.Map<List<ProductDTO>>(productService.GetAll());
        }

        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public ProductDTO GetById(int id)
        {
            return mapper.Map<ProductDTO>(productService.GetById(id));
        }

        [HttpGet("by-category/{categoryId}")]
        public List<ProductDTO> GetByCategoryId(int categoryId)
        {
            var products = productService.GetByCategoryId(categoryId);
            return mapper.Map<List<ProductDTO>>(products);
        }

        //חסימת פונקציות לשימוש מנהל בלבד 
        [Authorize]
        [HttpGet("out-of-stock")]
        public List<ProductDTO> GetOutOfStock()
        {
            var prods = productService.GetOutOfStock();
            return mapper.Map<List<ProductDTO>>(prods);
        }

        // POST api/<ProductsController>
        //חסימת פונקציות לשימוש מנהל בלבד 
        //[Authorize]
        [HttpPost]                      
        public void Post([FromBody] Product p) 
        {                                      
            productService.AddProduct(p);      
        }

        // PUT api/<ProductsController>/5
        //חסימת פונקציות לשימוש מנהל בלבד
        [Authorize]
        [HttpPut("{id}")] 
        public void Put(int id, [FromBody] Product p) 
        {
            productService.UpdateProduct(id, p); 
        }

        // DELETE api/<ProductsController>/5
        //חסימת פונקציות לשימוש מנהל בלבד 
        [Authorize]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            productService.DeleteProductById(id);
        }
    }
}
