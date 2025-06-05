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
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService categoryService;
        private readonly IMapper mapper;

        public CategoriesController(ICategoryService _categoryService, IMapper _mapper)
        {
            categoryService = _categoryService;
            mapper = _mapper;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public List<CategoryDTO> Get()
        {
            return mapper.Map<List<CategoryDTO>>(categoryService.GetAll());
        }

        [HttpGet("by-name/{name}")]
        //הוספת סטטוס
        public ActionResult GetByName(string name)
        {
            Category c = categoryService.GetByName(name);
            if (c == null)
                return NotFound();
            return Ok(mapper.Map<CategoryDTO>(c));
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public CategoryDTO GetById(int id)
        {
            return mapper.Map<CategoryDTO>(categoryService.GetById(id));
        }

        // POST api/<CategoryController>
        //חסימת פונקציות לשימוש מנהל בלבד 
        [Authorize]
        [HttpPost]
        //פונקציה אסינכרונית
        public async Task Post([FromBody] Category c)
        {
            await categoryService.AddCategoryAsync(c);
        }

        // PUT api/<CategoryController>/5
        //חסימת פונקציות לשימוש מנהל בלבד 
        [Authorize]
        [HttpPut("{id}")]
        //פונקציה אסינכרונית
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] Category c)
        {
            Category updatedCategory = await categoryService.UpdateCategoryAsync(id, c);

            if (updatedCategory == null)
                return NotFound();

            return Ok(updatedCategory);
        }


        // DELETE api/<CategoryController>/5
        //חסימת פונקציות לשימוש מנהל בלבד 
        [Authorize]
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            categoryService.DeleteCategoryById(id);
        }
    }
}
