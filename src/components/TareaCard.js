import { useState, useEffect, Fragment } from "react";
import { Button, Container, Row, Col, CloseButton } from "react-bootstrap";
import { format } from "date-fns";
import Card from "react-bootstrap/Card";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

export default function TareaCard({ tarea, closeCard }) {
  const [estado, setEstado] = useState();
  const [deadline, setDeadline] = useState();

  useEffect(() => {
    if (tarea.estado == "COMPLETO") {
      setEstado("Completo");
    } else if (tarea.estado == "EN_PROCESO") {
      setEstado("En proceso");
    } else if (tarea.estado == "EN_REVISION") {
      setEstado("En revision");
    }

    setDeadline(format(new Date(tarea.deadline), "dd-MMM-yyyy"));
  });

  return (
    <div>
      <Card>
        <Card.Header>
          {tarea.tarea}
          <CloseButton onClick={closeCard} />
        </Card.Header>

        <Card.Body>
          <Card.Title>
            {tarea.responsable.nombre} {tarea.responsable.apellido}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{deadline}</Card.Subtitle>
          <Card.Text as={Col}>Descripción:</Card.Text>
          <Card.Text>{tarea.descripcion}</Card.Text>
          <Card.Text as={Col}>Supervisor:</Card.Text>
          <Card.Text>
            {tarea.supervisor.nombre} {tarea.supervisor.apellido}
          </Card.Text>
          <Card.Text as={Col}>Estado:</Card.Text>
          <Card.Text>{estado}</Card.Text>
          <Card.Text as={Col}>Archivos:</Card.Text>
          <Container>
            <Row>
              {tarea.archivos.map((archivo, i) => (
                <Fragment key={i}>
                  <Col>
                    <Row>
                      <a href={archivo.url} target="_blank">
                        <BsFillFileEarmarkPdfFill />
                      </a>
                    </Row>
                    <Row>
                      <a href={archivo.url} target="_blank">
                        {archivo.nombre}
                      </a>
                    </Row>
                  </Col>
                </Fragment>
              ))}
            </Row>
          </Container>
          <Button variant="secondary">Editar</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
