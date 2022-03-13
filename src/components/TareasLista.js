import { useState, Fragment } from "react";
import { getTareaId } from "../services/tareas.service.js";
import { Button, Table, Row, Col, Container } from "react-bootstrap";
import { format } from "date-fns";
import TareaCard from "../components/TareaCard.js";

export default function TareasLista({
  tareas,
  setActualizarTareas,
  usuarios,
  estados,
}) {
  const [tarea, setTarea] = useState();
  const [showCard, setShowCard] = useState(false);
  function closeCard() {
    setShowCard(false);
  }

  const openCard = async (e) => {
    const data = await getTareaId(e.target.id);
    setTarea(data);
    setShowCard(true);
  };
  return (
    <div>
      <Row>
        <Col>
          <Container fluid>
            <Table>
              <thead>
                <tr>
                  <th>Tarea</th>
                  <th>Deadline</th>
                  <th>Estado</th>
                  <th>Responsable</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tareas.map(
                  ({ id, tarea, deadline, estado, responsable }, i) => {
                    if (estado == "COMPLETO") {
                      estado = "Completo";
                    } else if (estado == "EN_PROCESO") {
                      estado = "En proceso";
                    } else if (estado == "EN_REVISION") {
                      estado = "En revision";
                    }
                    deadline = format(+new Date(deadline), "dd-MMMM-yyyy");
                    return (
                      <Fragment key={i}>
                        <tr key={i}>
                          <td>{tarea}</td>
                          <td>{deadline}</td>
                          <td>{estado}</td>
                          <td>
                            {responsable.nombre} {responsable.apellido}
                          </td>
                          <td>
                            <Button onClick={openCard} id={id}>
                              Abrir
                            </Button>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  }
                )}
              </tbody>
            </Table>
          </Container>
        </Col>
        {showCard === true ? (
          <Col md={4}>
            <Container fluid className="pt-3">
              <TareaCard
                tarea={tarea}
                closeCard={closeCard}
                setActualizarTareas={setActualizarTareas}
                usuarios={usuarios}
                estados={estados}
              ></TareaCard>
            </Container>
          </Col>
        ) : (
          <div></div>
        )}
      </Row>
    </div>
  );
}
