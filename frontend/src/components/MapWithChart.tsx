import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import type { PuntoVenta } from '../types/puntoVenta';

const puntos: PuntoVenta[] = [
  { id: 1, latitud: 19.43, longitud: -99.13, descripcion: "Sucursal A", venta: 10000, zona: "Norte" },
  { id: 2, latitud: 19.45, longitud: -99.14, descripcion: "Sucursal B", venta: 15000, zona: "Sur" },
  // más datos...
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const MapWithChart = () => {

  const data = [
    { name: 'Norte', value: 10000 },
    { name: 'Sur', value: 15000 },
  ];

 const center: LatLngExpression = [19.43, -99.13];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="h-[300px] lg:h-[500px] lg:flex-1 rounded overflow-hidden shadow">
        <MapContainer 
          center={center}
          zoom={12}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {puntos.map(p => (
            <Marker key={p.id} position={[p.latitud, p.longitud]}>
              <Popup>{p.descripcion} - ${p.venta}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="lg:w-[400px] flex justify-center items-center">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default MapWithChart;