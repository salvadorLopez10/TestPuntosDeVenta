using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using PuntoVenta.Domain.Entities;
using PuntoVenta.Infrastructure.Persistence;

namespace PuntoVentaAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PuntosVentaController : ControllerBase
{
    private readonly AppDbContext _context;

    public PuntosVentaController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PuntoDeVenta>>> Get()
    {
        return await _context.PuntosVenta.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PuntoDeVenta>> Get(int id)
    {
        var punto = await _context.PuntosVenta.FindAsync(id);
        return punto == null ? NotFound() : Ok(punto);
    }

    [HttpPost]
    public async Task<ActionResult> Post(PuntoDeVenta punto)
    {
        _context.PuntosVenta.Add(punto);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = punto.Id }, punto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Put(int id, PuntoDeVenta punto)
    {
        if (id != punto.Id) return BadRequest();
        _context.Entry(punto).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Patch(int id, JsonElement data)
    {
        var punto = await _context.PuntosVenta.FindAsync(id);
        if (punto == null) return NotFound();

        foreach (var prop in data.EnumerateObject())
        {
            switch (prop.Name.ToLower())
            {
                case "latitud":
                    punto.Latitud = prop.Value.GetDouble();
                    break;
                case "longitud":
                    punto.Longitud = prop.Value.GetDouble();
                    break;
                case "descripcion":
                    punto.Descripcion = prop.Value.GetString();
                    break;
                case "venta":
                    punto.Venta = prop.Value.GetDecimal();
                    break;
                case "zona":
                    punto.Zona = prop.Value.GetString();
                    break;
            }
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var punto = await _context.PuntosVenta.FindAsync(id);
        if (punto == null) return NotFound();
        _context.PuntosVenta.Remove(punto);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
