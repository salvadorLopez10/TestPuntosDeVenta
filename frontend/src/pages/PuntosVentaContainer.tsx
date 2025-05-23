import { useState } from 'react';
import PuntosVentaTable from '../components/PuntosVentaTable';
import ModalPuntoVenta from '../components/ModalPuntoVenta';
import type { PuntoVenta } from '../types/puntoVenta';


const PuntosVentaContainer = () => {

    const [puntos, setPuntos] = useState<PuntoVenta[]>([
    {
        id: 1,
        descripcion: 'Sucursal Centro',
        zona: 'Centro',
        venta: 2300,
        latitud: 19.4326,
        longitud: -99.1332,
    },
    {
        id: 2,
        descripcion: 'Sucursal Norte',
        zona: 'Norte',
        venta: 1800,
        latitud: 19.5000,
        longitud: -99.1500,
    },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [puntoSeleccionado, setPuntoSeleccionado] = useState<PuntoVenta | null>(null);
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    const [puntoAEliminar, setPuntoAEliminar] = useState<PuntoVenta | null>(null);

    const handleCrearNuevo = () => {
        setPuntoSeleccionado(null);
        setModalVisible(true);
    };

    const handleEditar = (punto: PuntoVenta) => {
        setPuntoSeleccionado(punto);
        setModalVisible(true);
    };

    const handleEliminar = (punto: PuntoVenta) => {
        setPuntoAEliminar(punto);
        setConfirmDialogVisible(true);
        //setPuntos(prev => prev.filter(p => p.id !== id));
    };

    const handleGuardar = (nuevoPunto: PuntoVenta) => {
        setPuntos(prev => {
        const existe = prev.find(p => p.id === nuevoPunto.id);
        if (existe) {
            return prev.map(p => (p.id === nuevoPunto.id ? nuevoPunto : p));
        } else {
            return [...prev, { ...nuevoPunto, id: Date.now() }];
        }
        });
        setModalVisible(false);
    };

    const confirmarEliminacion = () => {
        if (puntoAEliminar) {
            setPuntos(prev => prev.filter(p => p.id !== puntoAEliminar.id));
        }
        setConfirmDialogVisible(false);
        setPuntoAEliminar(null);
    };

    const cancelarEliminacion = () => {
        setConfirmDialogVisible(false);
        setPuntoAEliminar(null);
    };

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-center text-2xl font-bold text-[#404040]">Gestión de Puntos de Venta</h1>

            <PuntosVentaTable
                puntos={puntos}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
                onCrearNuevo={handleCrearNuevo}
            />

            <ModalPuntoVenta
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleGuardar}
                punto={puntoSeleccionado}
            />
        
            {confirmDialogVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
                        <p className="mb-4">
                            ¿Estás seguro de que deseas eliminar "{puntoAEliminar?.descripcion}"?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={cancelarEliminacion}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
                            >
                            Cancelar
                            </button>
                            <button
                                onClick={confirmarEliminacion}
                                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                            >
                            Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PuntosVentaContainer;
