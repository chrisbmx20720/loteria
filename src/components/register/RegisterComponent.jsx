import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { addPuesto } from '../../services/PuestoService';

const RegisterPuestoComponent = () => {
  const [puesto, setPuesto] = useState({
    cantidad: '',
    devolucion1: '',
    devolucion2: '',
    agregado: '',
    perdidas: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPuesto({ ...puesto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPuesto(puesto);
      alert('¡Puesto registrado exitosamente!');
      setPuesto({
        cantidad: '',
        devolucion1: '',
        devolucion2: '',
        agregado: '',
        perdidas: ''
      });
    } catch (error) {
      console.error('Error al registrar el puesto:', error);
      alert('Hubo un error al registrar el puesto.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <h2 className="text-center mb-4">Registrar Puesto</h2>
            <Form.Group controlId="formCantidad" className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                value={puesto.cantidad}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDevolucion1" className="mb-3">
              <Form.Label>Devolución 1</Form.Label>
              <Form.Control
                type="number"
                name="devolucion1"
                value={puesto.devolucion1}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDevolucion2" className="mb-3">
              <Form.Label>Devolución 2</Form.Label>
              <Form.Control
                type="number"
                name="devolucion2"
                value={puesto.devolucion2}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAgregado" className="mb-3">
              <Form.Label>Agregado</Form.Label>
              <Form.Control
                type="number"
                name="agregado"
                value={puesto.agregado}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPerdidas" className="mb-3">
              <Form.Label>Pérdidas</Form.Label>
              <Form.Control
                type="number"
                name="perdidas"
                value={puesto.perdidas}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Registrar Puesto
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPuestoComponent;
