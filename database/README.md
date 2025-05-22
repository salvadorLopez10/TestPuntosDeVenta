# Esquema de Base de Datos

## Tabla: PuntosVenta

| Campo       | Tipo            | Descripción            |
|-------------|------------------|------------------------|
| Id          | INT (PK)         | Identificador único    |
| Latitud     | FLOAT            | Coordenada geográfica  |
| Longitud    | FLOAT            | Coordenada geográfica  |
| Descripcion | NVARCHAR(255)    | Texto descriptivo      |
| Venta       | DECIMAL(18,2)    | Monto de venta         |
| Zona        | NVARCHAR(100)    | Zona del punto de venta|