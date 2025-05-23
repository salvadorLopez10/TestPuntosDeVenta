import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import type { PuntoVenta } from '../types/puntoVenta';

interface ModalPuntoVentaProps {
  visible: boolean;
  onClose: () => void;
  onSave: (punto: PuntoVenta) => void;
  punto: PuntoVenta | null;
}

const ModalPuntoVenta: React.FC<ModalPuntoVentaProps> = ({ visible, onClose, onSave, punto }) => {
  const { register, handleSubmit, reset } = useForm<PuntoVenta>({
    defaultValues: punto ?? {
      id: 0,
      descripcion: '',
      zona: '',
      venta: 0,
      latitud: 0,
      longitud: 0,
    },
  });

  useEffect(() => {
    if (punto) {
      reset(punto);
    } else {
      reset({
        id: 0,
        descripcion: '',
        zona: '',
        venta: 0,
        latitud: 0,
        longitud: 0,
      });
    }
  }, [punto, reset]);

  const onSubmit = (data: PuntoVenta) => {
    if (punto) {
      onSave({ ...data, id: punto.id });
    } else {
      onSave({ ...data, id: Date.now() }); // ID generado temporalmente
    }
  };

  if (!visible) return null;

  return (
    <Dialog open={visible} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded bg-white p-6 shadow-lg space-y-4">
          <Dialog.Title className="text-xl font-bold text-center">
            {punto ? 'Editar Punto de Venta' : 'Nuevo Punto de Venta'}
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Descripción</label>
              <input
                {...register('descripcion')}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Zona</label>
              <input
                {...register('zona')}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Venta</label>
              <input
                type="number"
                {...register('venta', { valueAsNumber: true })}
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Latitud</label>
                <input
                  type="number"
                  step="any"
                  {...register('latitud', { valueAsNumber: true })}
                  className="w-full border border-gray-300 rounded p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Longitud</label>
                <input
                  type="number"
                  step="any"
                  {...register('longitud', { valueAsNumber: true })}
                  className="w-full border border-gray-300 rounded p-2"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#DF2E20] text-white rounded hover:bg-[#af2e24]"
              >
                Guardar
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalPuntoVenta;
