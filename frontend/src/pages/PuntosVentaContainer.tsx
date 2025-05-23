import { useEffect, useState } from 'react';
import PuntosVentaTable from '../components/PuntosVentaTable';
import ModalPuntoVenta from '../components/ModalPuntoVenta';
import type { PuntoVenta } from '../types/puntoVenta';
import { getPuntosVenta, createPuntoVenta, updatePuntoVenta, deletePuntoVenta } from '../api/puntosVenta';


const PuntosVentaContainer = () => {

    const [puntos, setPuntos] = useState<PuntoVenta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingOperation, setLoadingOperation] = useState<boolean>(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [puntoSeleccionado, setPuntoSeleccionado] = useState<PuntoVenta | null>(null);
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    const [puntoAEliminar, setPuntoAEliminar] = useState<PuntoVenta | null>(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await getPuntosVenta();
                setPuntos(response.data);
            } catch (error) {
                console.error('Error al obtener puntos de venta:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p className="text-center">Cargando puntos de venta...</p>;
    }

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

    const handleGuardar = async (nuevoPunto: PuntoVenta) => {
        try {
            if (nuevoPunto.id && puntos.some(p => p.id === nuevoPunto.id)) {
                // Actualizar
                setLoadingOperation(true);
                const response = await updatePuntoVenta(nuevoPunto.id, nuevoPunto);
                setLoadingOperation(false);
                setPuntos(prev => prev.map(p => (p.id === nuevoPunto.id ? response.data : p)));
            } else {
                // Crear nuevo
                setLoadingOperation(true);
                const response = await createPuntoVenta(nuevoPunto);
                setLoadingOperation(false);
                setPuntos(prev => [...prev, response.data]);
            }
            setModalVisible(false);
        } catch (error) {
            console.error('Error al guardar el punto de venta:', error);
        }
    };

    const confirmarEliminacion = async() => {
        if (!puntoAEliminar) return;

        try {
            setLoadingOperation(true);
            await deletePuntoVenta(puntoAEliminar.id);
            setPuntos(prev => prev.filter(p => p.id !== puntoAEliminar.id));
        } catch (error) {
            console.error('Error al eliminar punto de venta:', error);
        } finally {
            setLoadingOperation(false);
            setConfirmDialogVisible(false);
            setPuntoAEliminar(null);
        }
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
                loading={loadingOperation}
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
                                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white items-center flex gap-2"
                                disabled={loadingOperation}
                            >      
                                Eliminar
                            {loadingOperation && <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PuntosVentaContainer;
