import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";

export default function TareaCard({ tarea }) {
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState(tarea.tarea);

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Form>
          <Card.Header as="h5">
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
          </Card.Header>
          <Card.Body>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            ></Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                  console.log(descripcion);
                }}
              />
            </Form.Group>
          </Card.Body>
        </Form>
      </Card>
    </div>
  );
}
