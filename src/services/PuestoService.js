// src/services/puestosService.js
import { ApiUrl } from '../config/config';

const API_URL = `${ApiUrl}/puestos`;

export const obtenerPuestos = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener los puestos');
    return await res.json();
  } catch (error) {
    console.error('Error en obtenerPuestos:', error);
    return [];
  }
};

export const crearPuesto = async (nuevoPuesto) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoPuesto),
    });
    if (!res.ok) throw new Error('Error al crear el puesto');
    return await res.json();
  } catch (error) {
    console.error('Error en crearPuesto:', error);
    return null;
  }
};

export const editarPuesto = async (puestoId, puestoActualizado) => {
  try {
    const res = await fetch(`${API_URL}/${puestoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(puestoActualizado),
    });
    if (!res.ok) throw new Error('Error al editar el puesto');
    return await res.json();
  } catch (error) {
    console.error('Error en editarPuesto:', error);
    return null;
  }
};
