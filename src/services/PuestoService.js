// src/services/puestosService.js
import { ApiUrl } from '../config/config';

const apiUrl = `${ApiUrl}/puestos`;

// Obtener todos los puestos
export const obtenerPuestos = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error al obtener los puestos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los puestos:', error);
    throw error;
  }
};

// Obtener un puesto por ID
export const obtenerPuestoPorId = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Error al obtener el puesto');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el puesto:', error);
    throw error;
  }
};

// Crear un nuevo puesto
export const crearPuesto = async (nuevoPuesto) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoPuesto),
    });

    if (!response.ok) {
      throw new Error('Error al crear el puesto');
    }

    const data = await response.json();
    alert('¡Puesto registrado exitosamente!');
    return data;
  } catch (error) {
    console.error('Error al crear el puesto:', error);
    throw error;
  }
};

// Editar un puesto existente
export const editarPuesto = async (puesto) => {
  const puestoId = puesto._id || puesto.id;
  if (!puestoId) {
    alert('No se pudo identificar el puesto');
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/${puestoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(puesto),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar el puesto con id ${puestoId}`);
    }

    return { message: `Puesto con id ${puestoId} actualizado exitosamente` };
  } catch (error) {
    console.error('Error al actualizar el puesto:', error);
    throw error;
  }
};

// Eliminar un puesto
export const eliminarPuesto = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el puesto con id ${id}`);
    }

    return { message: `Puesto con id ${id} eliminado exitosamente` };
  } catch (error) {
    console.error('Error al eliminar el puesto:', error);
    throw error;
  }
};
