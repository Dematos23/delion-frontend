import BusquedaCard from "./BusquedaCard.js";
import { useState, Fragment } from "react";
import { Button, Table, Row, Col, Container } from "react-bootstrap";
import { getMarcas, deleteMarca } from "../../services/marcas.service.js";

export default function BusquedaLista({ marcas, setMarcas }) {
  const [showCard, setShowCard] = useState(false);
  function closeCard() {
    setShowCard(false);
  }
  const [marca, setMarca] = useState();
  const dataUsuario = { usuario: +localStorage.getItem("usuarioId") };

  const openCard = async (e) => {
    const data = await getMarcas(e.target.id);
    setMarca(data);
    setShowCard(true);
  };

  const [confirm, setConfirm] = useState(null);

  const eliminarMarca = async (id, data) => {
    await deleteMarca(id, data);
    // setActualizarTareas(true);
    setConfirm(null);
  };
  return (
    <Row>
      <Col as={Container}>
        <Table>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nombre</th>
              <th>Clases</th>
              <th>Productos</th>
              <th>Feacha de Vencimiento</th>
              <th></th>
            </tr>
            <tbody>
              {marcas.map(
                (
                  { id, nombre, clases, logo, productos, fechaVencimiento },
                  i
                ) => {
                  return (
                    <Fragment key={i}>
                      <tr key={id}>
                        <td></td>
                        <td>{nombre}</td>
                        <td>{clases}</td>
                        <td>{productos}</td>
                        <td>{fechaVencimiento}</td>
                        <td>
                          <Row>
                            <Col>
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
                                          eliminarMarca(
                                            +e.target.id,
                                            dataUsuario
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
          </thead>
        </Table>
      </Col>
      {/* {showCard === true ? (
        <Col md={4}>
          <Container fluid className="pt-3">
            <BusquedaCard></BusquedaCard>
          </Container>
        </Col>
      ) : (
        <Col></Col>
      )} */}
    </Row>
  );
}
