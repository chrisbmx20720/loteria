import React, { useState } from 'react';

const precios = {
  lunes: 1000,
  martes: 1500,
  miércoles: 2000,
};

const puestosIniciales = [
  'Puesto A',
  'Puesto B',
  'Puesto C',
  'Puesto D',
  'Puesto E',
  'Puesto F',
  'Puesto G',
  'Puesto H',
  'Puesto I',
  'Puesto J',
];

const CalculadoraLoteria = () => {
  const [diaSeleccionado, setDiaSeleccionado] = useState('');
  const [datosPuestos, setDatosPuestos] = useState(
    puestosIniciales.map((puesto) => ({
      nombre: puesto,
      cantidad: 0,
      agregado: 0,
      perdidas: 0,
      devolucion: 0,
      porcentaje: false,
      total: 0,
    }))
  );

  const manejarCambioDia = (evento) => {
    const { value } = evento.target;
    setDiaSeleccionado((prevDia) => (prevDia === value ? '' : value));
  };

  const manejarCambioPuesto = (indice, campo, valor) => {
    const nuevosDatos = [...datosPuestos];
    if (campo === 'porcentaje') {
      nuevosDatos[indice][campo] = valor;
    } else {
      nuevosDatos[indice][campo] = parseFloat(valor) || 0;
    }
    setDatosPuestos(nuevosDatos);
  };

  const calcularTotales = () => {
    if (!diaSeleccionado) {
      alert('Por favor, selecciona un día.');
      return;
    }

    const precioDia = precios[diaSeleccionado];
    let totalDevolucion = 0;
    let totalPerdida = 0;
    let totalGeneral = 0;

    const nuevosDatos = datosPuestos.map((puesto) => {
      const { cantidad, agregado, perdidas, devolucion, porcentaje } = puesto;
      const base = cantidad + agregado - perdidas;
      const totalSinDescuento = base * precioDia;
      const descuento = porcentaje ? totalSinDescuento * 0.04 : 0;
      const total = totalSinDescuento - descuento;

      totalDevolucion += devolucion;
      totalPerdida += perdidas;
      totalGeneral += total;

      return {
        ...puesto,
        total: total.toFixed(2),
      };
    });

    setDatosPuestos(nuevosDatos);
    setTotales({
      devolucion: (precioDia*totalDevolucion).toFixed(2),
      perdida: (precioDia*totalPerdida).toFixed(2),
      general: totalGeneral.toFixed(2),
    });
  };

  const [totales, setTotales] = useState({
    devolucion: '0.00',
    perdida: '0.00',
    general: '0.00',
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Calculadora de Lotería</h1>

      <div>
        <strong>Día:</strong>
        {Object.keys(precios).map((dia) => (
          <label key={dia} style={{ marginLeft: '10px' }}>
            <input
              type="checkbox"
              value={dia}
              checked={diaSeleccionado === dia}
              onChange={manejarCambioDia}
            />
            {` ${dia.charAt(0).toUpperCase() + dia.slice(1)} (₡${precios[dia]})`}
          </label>
        ))}
      </div>

      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={estiloCelda}>Puesto</th>
            <th style={estiloCelda}>Cantidad</th>
            <th style={estiloCelda}>Agregado</th>
            <th style={estiloCelda}>Pérdidas</th>
            <th style={estiloCelda}>Devolución</th>
            <th style={estiloCelda}>%</th>
            <th style={estiloCelda}>Total</th>
          </tr>
        </thead>
        <tbody>
          {datosPuestos.map((puesto, indice) => (
            <tr key={indice}>
              <td style={estiloCelda}>{puesto.nombre}</td>
              <td style={estiloCelda}>
                <input
                  type="text"
                  value={puesto.cantidad}
                  onChange={(e) => manejarCambioPuesto(indice, 'cantidad', e.target.value)}
                  style={estiloInput}
                />
              </td>
              <td style={estiloCelda}>
                <input
                  type="text"
                  value={puesto.agregado}
                  onChange={(e) => manejarCambioPuesto(indice, 'agregado', e.target.value)}
                  style={estiloInput}
                />
              </td>
              <td style={estiloCelda}>
                <input
                  type="text"
                  value={puesto.perdidas}
                  onChange={(e) => manejarCambioPuesto(indice, 'perdidas', e.target.value)}
                  style={estiloInput}
                />
              </td>
              <td style={estiloCelda}>
                <input
                  type="text"
                  value={puesto.devolucion}
                  onChange={(e) => manejarCambioPuesto(indice, 'devolucion', e.target.value)}
                  style={estiloInput}
                />
              </td>
              <td style={estiloCelda}>
                <input
                  type="checkbox"
                  checked={puesto.porcentaje}
                  onChange={(e) => manejarCambioPuesto(indice, 'porcentaje', e.target.checked)}
                />
              </td>
              <td style={estiloCelda}>₡{puesto.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={calcularTotales} style={estiloBoton}>
        Calcular
      </button>

      <h3>Totales Generales</h3>
      <p>Total Devolución: ₡{totales.devolucion}</p>
      <p>Total Pérdida: ₡{totales.perdida }</p>
      <p>Total General: ₡{totales.general}</p>
    </div>
  );
};

const estiloCelda = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
};

const estiloInput = {
  width: '80px',
  padding: '4px',
};

const estiloBoton = {
  marginTop: '20px',
  padding: '10px 20px',
  fontSize: '16px',
};

export default CalculadoraLoteria;
