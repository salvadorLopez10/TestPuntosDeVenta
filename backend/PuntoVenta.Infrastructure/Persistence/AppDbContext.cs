using Microsoft.EntityFrameworkCore;
using PuntoVenta.Domain.Entities;

namespace PuntoVenta.Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<PuntoDeVenta> PuntosVenta { get; set; }

    }
}
