import { api } from './axios';
import type { PuntoVenta } from '../types/puntoVenta';

export const getPuntosVenta = () => api.get<PuntoVenta[]>('/PuntosVenta');

export const createPuntoVenta = (data: PuntoVenta) => api.post('/PuntosVenta', data);

export const updatePuntoVenta = (id: number, data: Partial<PuntoVenta>) =>
  api.patch(`/PuntosVenta/${id}`, data);

export const deletePuntoVenta = (id: number) => api.delete(`/PuntosVenta/${id}`);
