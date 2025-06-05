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
    public class CategoryData : ICategoryData
    {
        public readonly DataContext dataContext;

        public CategoryData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public List<Category> GetAll()
        {
            return dataContext.categories.ToList();
        }

        public Category GetByName(string name)
        {
            return dataContext.categories.FirstOrDefault(x => x.Name == name)!;
        }

        public Category GetById(int id)
        {
            return dataContext.categories.FirstOrDefault(x => x.Id == id)!;
        }

        //פונקציה אסינכרונית
        public async Task AddCategoryAsync(Category c)
        {
            dataContext.categories.Add(c);
            await dataContext.SaveChangesAsync();
        }

        //פונקציה אסינכרונית
        public async Task<Category?> UpdateCategoryAsync(int id, Category c)
        {
            var update = await dataContext.categories.FirstOrDefaultAsync(x => x.Id == id);
            if (update != null)
            {
                update.Name = c.Name;
                await dataContext.SaveChangesAsync();
            }

            return update;
        }


        public void DeleteCategoryById(int id)
        {
            Category category = dataContext.categories.FirstOrDefault(x => x.Id == id)!;
            if (category != null)
            {
                dataContext.categories.Remove(category);
                dataContext.SaveChanges();
            }
        }
    }
}
