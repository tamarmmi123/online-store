using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Data
{
    public interface ICategoryData
    {
        public List<Category> GetAll();
        public Category GetByName(string name);
        public Category GetById(int id);
        //פונקציה אסינכרונית
        public Task AddCategoryAsync(Category c);
        //פונקציה אסינכרונית
        public Task<Category> UpdateCategoryAsync(int id, Category c);
        public void DeleteCategoryById(int id);
    }
}
