import { useState, useEffect, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  CloseButton,
  Form,
  Button,
} from "react-bootstrap";
import { format } from "date-fns";
import Card from "react-bootstrap/Card";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import TareaModal from "./TareaModal.js";
import { postArchivo, postS3, deleteS3 } from "../../services/archivos.service";

export default function TareaCard({
  tarea,
  actualizarTareas,
  closeCard,
  setActualizarTareas,
  usuarios,
  estados,
  req,
  setReq,
  reOpen,
  openCard,
}) {
  const [deadline, setDeadline] = useState();
  if (tarea.estado === "COMPLETO") {
    tarea.estado = "Completo";
  } else if (tarea.estado === "EN_PROCESO") {
    tarea.estado = "En proceso";
  } else if (tarea.estado === "EN_REVISION") {
    tarea.estado = "En revision";
  }
  useEffect(() => {
    setDeadline(format(new Date(tarea.deadline), "dd-MMM-yyyy"));
  });

  const [files, setFile] = useState([]);
  const subirArchivos = async (filesArray) => {
    for (let index = 0; index < filesArray.length; index++) {
      const file = filesArray[index];
      const data = {
        tareaId: tarea.id,
        contentType: file.type,
        ext: file.name.split(".")[1],
        filename: file.name.split(".")[0],
      };
      const res = await postArchivo(data);
      const url = res.data.url;
      await postS3(url, file);
      setActualizarTareas(true);
    }
  };

  const eliminarArchivo = (id, nombre) => {
    deleteS3(id, nombre);
  };

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
          <Card.Text as={Col}>Descripci??n:</Card.Text>
          <Card.Text>{tarea.descripcion}</Card.Text>
          <Card.Text as={Col}>Supervisor:</Card.Text>
          <Card.Text>
            {tarea.supervisor.nombre} {tarea.supervisor.apellido}
          </Card.Text>
          <Card.Text as={Col}>Estado:</Card.Text>
          <Card.Text>{tarea.estado}</Card.Text>
          <Card.Text as={Col}>Archivos:</Card.Text>
          <Container>
            <Row as={Form} className="mb-3 mt-2">
              <Col>
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) => {
                    setFile(e.target.files);
                  }}
                />
              </Col>
              <Col md={2}>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    subirArchivos(files);
                  }}
                >
                  Subir
                </Button>
              </Col>
            </Row>
            <Row>
              {tarea.archivos.map((archivo, i) => (
                <Fragment key={i}>
                  <Row className="mb-1">
                    <Col md={1}>
                      <a href={archivo.url} target="_blank" rel="noreferrer">
                        <BsFillFileEarmarkPdfFill />
                      </a>
                    </Col>
                    <Col>
                      <a href={archivo.url} target="_blank" rel="noreferrer">
                        {archivo.nombre}
                      </a>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          eliminarArchivo(tarea.id, archivo.nombre);
                        }}
                      >
                        Eliminar
                      </Button>
                    </Col>
                  </Row>
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
