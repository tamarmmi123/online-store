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
    public class CategoryService : ICategoryService
    {
        public readonly ICategoryData categoryData;

        public CategoryService(ICategoryData _categoryData)
        {
            categoryData = _categoryData;
        }

        public List<Category> GetAll()
        {
            return categoryData.GetAll();
        }

        public Category GetByName(String name)
        {
            return categoryData.GetByName(name);
        }

        public Category GetById(int id)
        {
            return categoryData.GetById(id);
        }

        public async Task AddCategoryAsync(Category c)
        {
            await categoryData.AddCategoryAsync(c);
        }

        public async Task<Category> UpdateCategoryAsync(int id, Category c)
        {
            return await categoryData.UpdateCategoryAsync(id, c);
        }

        public void DeleteCategoryById(int id)
        {
            categoryData.DeleteCategoryById(id);
        }
    }
}
