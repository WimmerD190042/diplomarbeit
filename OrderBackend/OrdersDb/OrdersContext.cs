using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace OrdersDb;

public partial class OrdersContext : DbContext
{
    public OrdersContext()
    {
    }

    public OrdersContext(DbContextOptions<OrdersContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Article> Articles { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<MeatPiece> MeatPieces { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<SubCategory> SubCategories { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(LocalDB)\\mssqllocaldb;attachdbfilename=C:\\temp\\Orders.mdf;integrated security=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.ToTable("Address");
        });

        modelBuilder.Entity<Article>(entity =>
        {
            entity.HasIndex(e => e.MeatPieceId, "IX_Articles_MeatPieceId");

            entity.HasIndex(e => e.OrderId, "IX_Articles_OrderId");

            entity.HasOne(d => d.MeatPiece).WithMany(p => p.Articles).HasForeignKey(d => d.MeatPieceId);

            entity.HasOne(d => d.Order).WithMany(p => p.Articles).HasForeignKey(d => d.OrderId);
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasIndex(e => e.AddressId, "IX_Customers_AddressId");

            entity.Property(e => e.FirstName).HasColumnName("firstName");
            entity.Property(e => e.LastName).HasColumnName("lastName");

            entity.HasOne(d => d.Address).WithMany(p => p.Customers).HasForeignKey(d => d.AddressId);
        });

        modelBuilder.Entity<MeatPiece>(entity =>
        {
            entity.HasIndex(e => e.SubCategoryId, "IX_MeatPieces_SubCategoryId");

            entity.HasOne(d => d.SubCategory).WithMany(p => p.MeatPieces).HasForeignKey(d => d.SubCategoryId);
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasIndex(e => e.CustomerId, "IX_Orders_CustomerId");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders).HasForeignKey(d => d.CustomerId);
        });

        modelBuilder.Entity<SubCategory>(entity =>
        {
            entity.HasIndex(e => e.CategoryId, "IX_SubCategories_CategoryId");

            entity.HasOne(d => d.Category).WithMany(p => p.SubCategories).HasForeignKey(d => d.CategoryId);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
