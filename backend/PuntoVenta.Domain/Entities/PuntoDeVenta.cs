namespace PuntoVenta.Domain.Entities
{
    public class PuntoDeVenta
    {
        public int Id { get; set; }
        public double Latitud { get; set; }
        public double Longitud { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public decimal Venta { get; set; }
        public string Zona { get; set; } = string.Empty;
    }
}