using Microsoft.EntityFrameworkCore;
using Project.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Category> categories { get; set; }
        public DbSet<Order> orders { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<User> users { get; set; }

        public DataContext(DbContextOptions<DataContext> option) : base (option)
        {

        }
    }
}
