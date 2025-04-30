import { ApiUrl } from '../config/config';

const apiUrl = `${ApiUrl}/puestos`;

// Obtener todos los puestos
export const getPuestos = async () => {
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

// Obtener un puesto por su ID
export const getPuestoById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
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

// Agregar un nuevo puesto
export const addPuesto = async (puesto) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(puesto),
    });

    if (!response.ok) {
      throw new Error('Error al agregar el puesto');
    }

    const data = await response.json();
    alert('¡Puesto registrado exitosamente!');
    return data;
  } catch (error) {
    console.error('Error al agregar el puesto:', error);
    throw error;
  }
};

// Actualizar un puesto existente
export const updatePuesto = async (puesto) => {
  const puestoId = puesto._id || puesto.id;
  if (!puestoId) {
    alert('No se pudo identificar el puesto');
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/${puestoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(puesto),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar el puesto con id ${puestoId}`);
    }

    const data = await response.json();
    alert('¡Puesto actualizado exitosamente!');
    return data;
  } catch (error) {
    console.error('Error al actualizar el puesto:', error);
    throw error;
  }
};

// Eliminar un puesto por su ID
export const deletePuesto = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el puesto con id ${id}`);
    }

    alert('¡Puesto eliminado exitosamente!');
    return { message: `Puesto con id ${id} eliminado exitosamente` };
  } catch (error) {
    console.error('Error al eliminar el puesto:', error);
    throw error;
  }
};
