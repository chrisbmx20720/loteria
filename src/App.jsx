import React, { useEffect, useState } from 'react';
import RegistroPuestos from './components/register/RegisterComponent';
import CalculadoraLoteria from './components/calculadora/Calculadora';
import { obtenerPuestos, crearPuesto } from './services/PuestoService';

const App = () => {
  const [puestos, setPuestos] = useState([]);
  const [vista, setVista] = useState('calcular'); // 'registro' o 'calcular'

  const cargarPuestos = async () => {
    const datos = await obtenerPuestos();
    setPuestos(datos);
  };

  const agregarPuesto = async (nuevo) => {
    const guardado = await crearPuesto(nuevo);
    setPuestos((prev) => [...prev, guardado]);
    setVista('calcular'); // Volver a la vista principal luego de guardar
  };

  const actualizarPuesto = (puestoEditado) => {
    setPuestos((prevPuestos) =>
      prevPuestos.map((puesto) =>
        puesto.id === puestoEditado.id ? puestoEditado : puesto
      )
    );
  };

  useEffect(() => {
    cargarPuestos();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setVista('registro')}>Registrar Puesto</button>
      </div>

      {vista === 'registro' ? (
        <RegistroPuestos onGuardar={agregarPuesto} />
      ) : (
        <CalculadoraLoteria puestos={puestos} actualizarPuesto={actualizarPuesto} />
      )}
    </div>
  );
};

export default App;
