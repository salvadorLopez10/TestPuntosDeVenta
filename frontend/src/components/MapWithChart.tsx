import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import type { LatLngBoundsExpression } from 'leaflet';
import type { PuntoVenta } from '../types/puntoVenta';
import { useEffect, useState } from 'react';
import { getPuntosVenta } from '../api/puntosVenta';

const COLORS = ['#df2e20', '#006ba1', '#f97352', '#2a2a2a', '#374e79', '#2f4858'];

const customMarker = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const AjustarVistaMapa = ({ puntos }: { puntos: PuntoVenta[] }) => {
  const map = useMap();

  useEffect(() => {
    if (puntos.length > 0) {
      const bounds: LatLngBoundsExpression = puntos.map(p => [p.latitud, p.longitud]);
      map.fitBounds(bounds);
    }
  }, [puntos, map]);

  return null;
}

const FixMapResize = () => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);

  return null;
};


const MapWithChart = () => {
  const [puntos, setPuntos] = useState<PuntoVenta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect (() => {
    const fetchPuntos = async () => {
        try {
            setLoading(true);
            const response = await getPuntosVenta();
            setPuntos(response.data);
        } catch (error) {
            console.error('Error al obtener puntos de venta:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchPuntos();
  }, []);

  // Agrupar por zona y sumar ventas
  const data = Object.values(
    puntos.reduce((acc, punto) => {
      if (!acc[punto.zona]) {
        acc[punto.zona] = { name: punto.zona, value: 0 };
      }
      acc[punto.zona].value += punto.venta;
      return acc;
    }, {} as Record<string, { name: string; value: number }>)
  );

  const totalVentas = data.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Cargando puntos de venta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="h-[300px] lg:h-[500px] lg:flex-1 rounded overflow-hidden shadow">
        <MapContainer 
          center={[19.43, -99.13]}
          zoom={12}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {puntos.map((p) => (
            <Marker key={p.id} position={[p.latitud, p.longitud]} icon={customMarker}>
              <Popup>
                <strong>{p.descripcion}</strong><br />
                Venta: {p.venta.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}<br />
                Zona: {p.zona}
              </Popup>
            </Marker>
          ))}
          <AjustarVistaMapa puntos={puntos} />
          <FixMapResize />
        </MapContainer>
      </div>

      <div className="lg:w-[400px] flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Total: {totalVentas.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
        </h2>

        {
          data.length === 0 ? (
                <p className="text-gray-500 text-center">No hay datos disponibles para graficar.</p>
          ): (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">Distribución de Ventas por Zona</p>
              </div>
              
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) =>
                    `${name}: ${value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`
                  }
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) =>
                    value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
                  }
                />
                <Legend />
                </PieChart>
            </>
          )
        }

       
        
      </div>
    </div>
  );
}

export default MapWithChart;