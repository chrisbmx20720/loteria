import React, { useState, useEffect } from 'react';


const precios = {
  lunes: 1000,
  martes: 1500,
  miércoles: 2000,
};

const CalculadoraLoteria = ({ puestos, actualizarPuesto }) => {
  const [datosPuestos, setDatosPuestos] = useState([]);
  const [diaVisible, setDiaVisible] = useState('dia1');
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [edicionPuesto, setEdicionPuesto] = useState(null);
  const [totalGeneral, setTotalGeneral] = useState(0);

  useEffect(() => {
    const puestosConTotal = puestos.map((p) => ({
      ...p,
      total: p.total || '0.00',
    }));
    setDatosPuestos(puestosConTotal);
  }, [puestos]);

  const manejarSeleccionDiaPrecio = (dia) => {
    setDiasSeleccionados((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const calcularTotales = () => {
    if (diasSeleccionados.length === 0) {
      alert('Selecciona al menos un día con precio.');
      return;
    }

    let totalGeneral = 0;

    const nuevosPuestos = datosPuestos.map((puesto) => {
      const cantidad = Number(puesto.cantidades[diaVisible]) || 0;
      const agregado = Number(puesto.agregado) || 0;
      const perdidas = Number(puesto.perdidas) || 0;
      const tienePorcentaje = puesto.porcentaje;

      let total = 0;
      diasSeleccionados.forEach((dia) => {
        const precio = precios[dia];
        const base = cantidad + agregado - perdidas;
        const subtotal = base * precio;
        const descuento = tienePorcentaje ? subtotal * 0.04 : 0;
        total += subtotal - descuento;
      });

      totalGeneral += total;

      return { ...puesto, total: total.toFixed(2) };
    });

    setDatosPuestos(nuevosPuestos);
    setTotalGeneral(totalGeneral.toFixed(2));
  };

  const editarPuesto = (puesto) => {
    setEdicionPuesto({ ...puesto });
  };

  const guardarEdicion = () => {
    actualizarPuesto(edicionPuesto);
    setEdicionPuesto(null);
  };

  const manejarCambioEdicion = (campo, valor) => {
    setEdicionPuesto((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const estilosBoton = {
    backgroundColor: '#6a0dad',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 10px',
    margin: '2px',
    cursor: 'pointer',
  };

  const estilosBoton1 = {
    backgroundColor: '#d4edda',
    color: '#0b2e13',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 10px',
    margin: '2px',
    cursor: 'pointer',
  };

  const responsiveStyle = {
    overflowX: 'auto',
    maxWidth: '100%',
  };

  return (
    <div style={{ padding: '10px' }}>
      <h2>Calculadora de Lotería</h2>

      <div>
        <label>
          Día visible:
          <select value={diaVisible} onChange={(e) => setDiaVisible(e.target.value)} style={{ marginLeft: '10px' }}>
            <option value="dia1">Día 1</option>
            <option value="dia2">Día 2</option>
            <option value="dia3">Día 3</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
        <strong>Días con precio:</strong>
        {Object.keys(precios).map((dia) => (
          <label key={dia} style={{ marginLeft: '10px' }}>
            <input
              type="checkbox"
              value={dia}
              checked={diasSeleccionados.includes(dia)}
              onChange={() => manejarSeleccionDiaPrecio(dia)}
            />
            {` ${dia} (₡${precios[dia]})`}
          </label>
        ))}
      </div>

      <div style={{ marginTop: '15px', ...responsiveStyle }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad ({diaVisible})</th>
              <th>Agregado</th>
              <th>Pérdidas</th>
              <th>Devolución</th>
              <th>%</th>
              <th>Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {datosPuestos.map((puesto) => (
              <tr key={puesto.id}>
                <td>
                  {edicionPuesto?.id === puesto.id ? (
                    <input
                      type="text"
                      value={edicionPuesto.nombre}
                      onChange={(e) => manejarCambioEdicion('nombre', e.target.value)}
                    />
                  ) : (
                    puesto.nombre
                  )}
                </td>
                <td>
                  {edicionPuesto?.id === puesto.id ? (
                    <input
                      type="number"
                      value={edicionPuesto.cantidades[diaVisible]}
                      onChange={(e) =>
                        manejarCambioEdicion('cantidades', {
                          ...edicionPuesto.cantidades,
                          [diaVisible]: e.target.value,
                        })
                      }
                    />
                  ) : (
                    puesto.cantidades[diaVisible]
                  )}
                </td>
                <td>
                  {edicionPuesto?.id === puesto.id ? (
                    <input
                      type="number"
                      value={edicionPuesto.agregado}
                      onChange={(e) => manejarCambioEdicion('agregado', e.target.value)}
                    />
                  ) : (
                    puesto.agregado
                  )}
                </td>
                <td>
                  {edicionPuesto?.id === puesto.id ? (
                    <input
                      type="number"
                      value={edicionPuesto.perdidas}
                      onChange={(e) => manejarCambioEdicion('perdidas', e.target.value)}
                    />
                  ) : (
                    puesto.perdidas
                  )}
                </td>
                <td>
                  {edicionPuesto?.id === puesto.id ? (
                    <input
                      type="number"
                      value={edicionPuesto.devolucion}
                      onChange={(e) => manejarCambioEdicion('devolucion', e.target.value)}
                    />
                  ) : (
                    puesto.devolucion
                  )}
                </td>
                <td>
                  {edicionPuesto?.id === puesto.id ? (
                    <input
                      type="number"
                      value={edicionPuesto.porcentaje}
                      onChange={(e) => manejarCambioEdicion('porcentaje', e.target.value)}
                    />
                  ) : (
                    puesto.porcentaje
                  )}
                </td>
                <td>{puesto.total}</td>
                <td>
                  {edicionPuesto?.id === puesto.id ? (
                    <button style={estilosBoton1} onClick={guardarEdicion}>Guardar</button>
                  ) : (
                    <button style={estilosBoton1} onClick={() => editarPuesto(puesto)}>Editar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={calcularTotales} style={{ ...estilosBoton, marginTop: '20px', padding: '10px 16px' }}>
        Calcular Totales
      </button>

      {totalGeneral > 0 && (
        <div style={{ marginTop: '15px', fontWeight: 'bold', fontSize: '1.2em' }}>
          Total general: ₡{totalGeneral}
        </div>
      )}
    </div>
  );
};

export default CalculadoraLoteria;
