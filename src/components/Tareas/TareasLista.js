import { useState, Fragment } from "react";
import { getTareaId, deleteTarea } from "../../services/tareas.service.js";
import { Button, Table, Row, Col, Container } from "react-bootstrap";
import { format } from "date-fns";
import TareaCard from "./TareaCard.js";
import { BsArrowDownUp } from "react-icons/bs";

export default function TareasLista({
  tareas,
  actualizarTareas,
  setActualizarTareas,
  usuarios,
  estados,
  req,
  setReq,
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

  const reOpen = () => {
    setShowCard(false);
    setShowCard(true);
  };

  const deleteData = { usuarioId: +localStorage.getItem("usuarioId") };

  const [confirm, setConfirm] = useState(null);
  const eliminarTarea = async (id, data) => {
    await deleteTarea(id, data);
    setActualizarTareas(true);
    setConfirm(null);
  };
  const [sortBy, setSortBy] = useState("asc");
  const tareaOrderBy = (orderBy) => {
    const newReq = req;
    newReq.orderBy = orderBy;
    newReq.sort = sortBy;
    if (sortBy === "asc") {
      setSortBy("desc");
    } else {
      setSortBy("asc");
    }
    setReq(newReq);
    setActualizarTareas(true);
  };

  return (
    <div>
      <Row>
        <Col>
          <Container fluid>
            <Table>
              <thead>
                <tr>
                  <th>
                    Tarea
                    <Button
                      variant="link"
                      onClick={(e) => {
                        tareaOrderBy("tarea");
                      }}
                    >
                      <BsArrowDownUp></BsArrowDownUp>
                    </Button>
                  </th>
                  <th>
                    Deadline
                    <Button
                      variant="link"
                      onClick={(e) => {
                        tareaOrderBy("deadline");
                      }}
                    >
                      <BsArrowDownUp></BsArrowDownUp>
                    </Button>
                  </th>
                  <th>
                    Estado
                    <Button
                      variant="link"
                      onClick={(e) => {
                        tareaOrderBy("estado");
                      }}
                    >
                      <BsArrowDownUp></BsArrowDownUp>
                    </Button>
                  </th>
                  <th>
                    Responsable
                    <Button
                      variant="link"
                      onClick={(e) => {
                        tareaOrderBy("responsableId");
                      }}
                    >
                      <BsArrowDownUp></BsArrowDownUp>
                    </Button>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tareas.map(
                  ({ id, tarea, deadline, estado, responsable }, i) => {
                    if (estado === "COMPLETO") {
                      estado = "Completo";
                    } else if (estado === "EN_PROCESO") {
                      estado = "En proceso";
                    } else if (estado === "EN_REVISION") {
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
                            <Row>
                              <Col md={3}>
                                <Button onClick={openCard} id={id}>
                                  Abrir
                                </Button>
                              </Col>
                              <Col lg={9}>
                                {confirm === id ? (
                                  <Col>
                                    <Row>
                                      <Col md={6}>
                                        <p>¿Desea eliminar la tarea?</p>
                                      </Col>
                                      <Col md={3}>
                                        <Button
                                          variant="secondary"
                                          onClick={() => setConfirm(false)}
                                        >
                                          Cancelar
                                        </Button>
                                      </Col>
                                      <Col md={3}>
                                        <Button
                                          variant="danger"
                                          onClick={(e) => {
                                            eliminarTarea(
                                              +e.target.id,
                                              deleteData
                                            );
                                          }}
                                          id={id}
                                        >
                                          Eliminar
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Col>
                                ) : (
                                  <Button
                                    md={3}
                                    variant="danger"
                                    onClick={() => {
                                      setConfirm(id);
                                    }}
                                  >
                                    Eliminar
                                  </Button>
                                )}
                              </Col>
                            </Row>
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
                actualizarTareas={actualizarTareas}
                tarea={tarea}
                closeCard={closeCard}
                setActualizarTareas={setActualizarTareas}
                usuarios={usuarios}
                estados={estados}
                req={req}
                setReq={setReq}
                reOpen={reOpen}
                openCard={openCard}
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
