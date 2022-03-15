import { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, CloseButton } from "react-bootstrap";
import { format } from "date-fns";
import Card from "react-bootstrap/Card";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import TareaModal from "./TareaModal.js";

export default function TareaCard({
  tarea,
  closeCard,
  setActualizarTareas,
  usuarios,
  estados,
}) {
  const [deadline, setDeadline] = useState();
  useEffect(() => {
    if (tarea.estado === "COMPLETO") {
      tarea.estado = "Completo";
    } else if (tarea.estado === "EN_PROCESO") {
      tarea.estado = "En proceso";
    } else if (tarea.estado === "EN_REVISION") {
      tarea.estado = "En revision";
    }

    setDeadline(format(new Date(tarea.deadline), "dd-MMM-yyyy"));
  });

  return (
    <div>
      <Card>
        <Card.Header className="pb-1">
          <Row>
            <Col>{tarea.tarea}</Col>
            <Col sm={2}>
              <CloseButton onClick={closeCard} />
            </Col>
          </Row>
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
          <Card.Text>{tarea.estado}</Card.Text>
          <Card.Text as={Col}>Archivos:</Card.Text>
          <Container>
            <Row>
              {tarea.archivos.map((archivo, i) => (
                <Fragment key={i}>
                  <Col>
                    <Row>
                      <a href={archivo.url} target="_blank" rel="noreferrer">
                        <BsFillFileEarmarkPdfFill />
                      </a>
                    </Row>
                    <Row>
                      <a href={archivo.url} target="_blank" rel="noreferrer">
                        {archivo.nombre}
                      </a>
                    </Row>
                  </Col>
                </Fragment>
              ))}
            </Row>
          </Container>
          <TareaModal
            setActualizarTareas={setActualizarTareas}
            estados={estados}
            usuarios={usuarios}
            tarea={tarea}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
