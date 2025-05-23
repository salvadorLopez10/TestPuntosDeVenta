import { useState } from 'react';
import type { PuntoVenta } from '../types/puntoVenta';

type Props = {
  puntos: PuntoVenta[];
  onEditar: (punto: PuntoVenta) => void;
  onEliminar: (punto: PuntoVenta) => void;
  onCrearNuevo: () => void;
}

const PuntosVentaTable = ( { puntos, onEditar, onEliminar, onCrearNuevo }: Props ) => {

  const [busqueda, setBusqueda] = useState('');
  // Filtrar puntos de venta por descripción o zona
  const puntosFiltrados = puntos.filter((p) =>
  (p.descripcion?.toLowerCase().includes(busqueda.toLowerCase()) || 
   p.zona?.toLowerCase().includes(busqueda.toLowerCase()))
);

  return (
    <div className="space-y-4">
      {/* Búsqueda y botón de nuevo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4">
        <div className="flex-1 md:mr-4">
          <input
            type="text"
            placeholder="Buscar por descripción o zona..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div className="md:flex md:justify-end">
          <button
            onClick={onCrearNuevo}
            className="w-full md:w-auto bg-[#DF2E20] hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Nuevo
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-center text-sm font-semibold">Descripción</th>
              <th className="px-4 py-2 text-center text-sm font-semibold">Zona</th>
              <th className="px-4 py-2 text-center text-sm font-semibold">Ventas</th>
              <th className="px-4 py-2 text-center text-sm font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {puntosFiltrados.map((punto) => (
              <tr key={punto.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-2">{punto.descripcion}</td>
                <td className="px-4 py-2">{punto.zona}</td>
                <td className="px-4 py-2">{punto.venta}</td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => onEditar(punto)}
                    className="rounded border-2 border-blue-500 px-3 py-1 text-black hover:bg-blue-600 hover:text-white text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onEliminar(punto)}
                    className="rounded border-2 border-[#DF2E20] px-3 py-1 text-black hover:bg-red-600 hover:text-white text-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {puntosFiltrados.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PuntosVentaTable;
