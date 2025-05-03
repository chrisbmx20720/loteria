import React, { useState } from 'react';

const RegistroPuestos = ({ onGuardar }) => {
  const [nuevoPuesto, setNuevoPuesto] = useState({
    nombre: '',
    cantidades: { dia1: 0, dia2: 0, dia3: 0 },
    agregado: 0,
    perdidas: 0,
    devolucion: 0,
    porcentaje: false,
  });

  const manejarCambio = (campo, valor, subcampo = null) => {
    if (subcampo) {
      setNuevoPuesto(prev => ({
        ...prev,
        [campo]: {
          ...prev[campo],
          [subcampo]: parseFloat(valor) || 0,
        },
      }));
    } else if (campo === 'porcentaje') {
      setNuevoPuesto(prev => ({ ...prev, porcentaje: valor }));
    } else {
      setNuevoPuesto(prev => ({ ...prev, [campo]: parseFloat(valor) || 0 }));
    }
  };

  const guardarPuesto = () => {
    if (!nuevoPuesto.nombre.trim()) {
      alert('El nombre del puesto es obligatorio');
      return;
    }
    onGuardar({ ...nuevoPuesto, total: 0 });
    // Reiniciar formulario
    setNuevoPuesto({
      nombre: '',
      cantidades: { dia1: 0, dia2: 0, dia3: 0 },
      agregado: 0,
      perdidas: 0,
      devolucion: 0,
      porcentaje: false,
    });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Registrar Puesto</h2>
      <div>
        <label>Nombre del puesto: </label>
        <input type="text" value={nuevoPuesto.nombre} onChange={e => setNuevoPuesto({ ...nuevoPuesto, nombre: e.target.value })} />
      </div>
      <div>
        <label>Cantidad Día 1: </label>
        <input type="number" value={nuevoPuesto.cantidades.dia1} onChange={e => manejarCambio('cantidades', e.target.value, 'dia1')} />
      </div>
      <div>
        <label>Cantidad Día 2: </label>
        <input type="number" value={nuevoPuesto.cantidades.dia2} onChange={e => manejarCambio('cantidades', e.target.value, 'dia2')} />
      </div>
      <div>
        <label>Cantidad Día 3: </label>
        <input type="number" value={nuevoPuesto.cantidades.dia3} onChange={e => manejarCambio('cantidades', e.target.value, 'dia3')} />
      </div>
      <div>
        <label>Agregado: </label>
        <input type="number" value={nuevoPuesto.agregado} onChange={e => manejarCambio('agregado', e.target.value)} />
      </div>
      <div>
        <label>Pérdidas: </label>
        <input type="number" value={nuevoPuesto.perdidas} onChange={e => manejarCambio('perdidas', e.target.value)} />
      </div>
      <div>
        <label>Devolución: </label>
        <input type="number" value={nuevoPuesto.devolucion} onChange={e => manejarCambio('devolucion', e.target.value)} />
      </div>
      <div>
        <label>% Descuento: </label>
        <input type="checkbox" checked={nuevoPuesto.porcentaje} onChange={e => manejarCambio('porcentaje', e.target.checked)} />
      </div>
      <button onClick={guardarPuesto}>Guardar Puesto</button>
    </div>
  );
};

export default RegistroPuestos;
