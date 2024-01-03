using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace OrdersDb;

public partial class OrdersContext : DbContext
{
    public OrdersContext(){}

    public OrdersContext(DbContextOptions<OrdersContext> options)
        : base(options)
    {}

    public virtual DbSet<Article> Articles { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<MeatPiece> MeatPieces { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<SalesDay> SalesDays { get; set; }

    public virtual DbSet<SubCategory> SubCategories { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        DotNetEnv.Env.Load();
        var dbConnectionString = Environment.GetEnvironmentVariable("DBPATH");
        optionsBuilder.UseSqlServer(dbConnectionString);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
