import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";
import { postTarea } from "../services/tareas.service.js";
import { add } from "date-fns";

export default function TareaModal({
  estados,
  usuarios,
  setActualizarTareas,
  tarea,
}) {
  // Modal
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTareaNombre(undefined);
    setDescripcion(undefined);
    setDeadline(undefined);
    setEstado(undefined);
    setResponsableId(undefined);
    setSupervisorId(undefined);
    setTareaEditada(undefined);
  };
  const handleShow = () => {
    setShow(true);
    // const estadosNuevos
    if (tarea.estado == "COMPLETO") {
      tarea.estado == "Completo";
    } else if (tarea.estado == "EN_PROCESO") {
      tarea.estado == "En proceso";
    } else if (tarea.estado == "EN_REVISION") {
      tarea.estado == "En revision";
    }
  };

  // Submit
  const manejarSubmit = async (e) => {
    e.preventDefault();
    const tareaData = new FormData(e.target);
    const tareaObjt = Object.fromEntries(tareaData.entries());
    e.target.responsable.getAttribute("responsableid");
    tareaObjt.deadline = add(new Date(e.target.deadline.value), { hours: 5 });
    console.log(typeof tareaObjt.deadline);
    tareaObjt.responsableId = +tareaObjt.responsable;
    tareaObjt.supervisorId = +tareaObjt.supervisor;
    tareaObjt.creadorId = +localStorage.getItem("usuarioId");
    if (tareaObjt.estado === "Completo") {
      tareaObjt.estado = "COMPLETO";
    } else if (tareaObjt.estado === "En proceso") {
      tareaObjt.estado = "EN_PROCESO";
    } else if (tareaObjt.estado === "En revision") {
      tareaObjt.estado = "EN_REVISION";
    }
    await postTarea(tareaObjt);
    setActualizarTareas(true);
  };

  // EDITAR TAREA
  const [tareaNombre, setTareaNombre] = useState();
  const [descripcion, setDescripcion] = useState();
  const [deadline, setDeadline] = useState();
  const [estado, setEstado] = useState();
  const [responsableId, setResponsableId] = useState();
  const [supervisorId, setSupervisorId] = useState();
  const [tareaEditada, setTareaEditada] = useState({
    tarea: "",
    descripcion: "",
    deadline: "2023-03-07T14:24:38.427Z",
    estado: "COMPLETO",
    responsableId: 14,
    supervisorId: 9,
  });
  return (
    <div>
      {tarea === undefined ? (
        <>
          <Button variant="primary" onClick={handleShow}>
            Nueva Tarea
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  manejarSubmit(e);
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Tarea</Form.Label>
                  <Form.Control
                    type="string"
                    placeholder="Ingresar nueva tarea"
                    name="tarea"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ingresar descripción de la tarea"
                    name="descripcion"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select name="estado" defaultValue="En proceso">
                    {estados.map((estado, i) => (
                      <option key={i}>{estado}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label label="Deadline">
                    Deadline
                    <Form.Control type="date" name="deadline" />
                  </Form.Label>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Responsable</Form.Label>
                  <Form.Select name="responsable">
                    {usuarios.map((usuario, i) => (
                      <option key={i} value={usuario.id}>
                        {usuario.nombre} {usuario.apellido}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Supervisor</Form.Label>
                  <Form.Select name="supervisor">
                    {usuarios.map((usuario, i) => (
                      <option key={i} value={usuario.id}>
                        {usuario.nombre} {usuario.apellido}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Footer */}
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <>
          <Button variant="secondary" onClick={handleShow}>
            Editar
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  manejarSubmit(e);
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Tarea</Form.Label>
                  <Form.Control
                    type="string"
                    placeholder="Ingresar nueva tarea"
                    name="tarea"
                    value={
                      tareaNombre === undefined ? tarea.tarea : tareaNombre
                    }
                    onChange={(e) => setTareaNombre(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ingresar descripción de la tarea"
                    name="descripcion"
                    value={
                      descripcion === undefined
                        ? tarea.descripcion
                        : descripcion
                    }
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    defaultValue={tarea.estado}
                    name="estado"
                    as="select"
                    // value={estado === undefined ? tarea.estado : estado}
                    // onChange={(e) => setEstado(e.target.value)}
                  >
                    <option key="current" value={tarea.estado}>
                      {tarea.estado}
                    </option>
                    {estados.map(
                      (estado, i) => (
                        <option key={i} value={estado}>
                          {estado}
                        </option>
                      )
                      // {
                      //   if (estado == tarea.estado) {
                      //     return (
                      //       <option
                      //         key={i}
                      //         value={estado}
                      //         defaultValue={tarea.estado}
                      //       >
                      //         {estado}
                      //       </option>
                      //     );
                      //   } else {
                      //     return (
                      //       <option key={i} value={estado}>
                      //         {estado}
                      //       </option>
                      //     );
                      //   }
                      // }
                    )}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label label="Deadline">
                    Deadline
                    <Form.Control type="date" name="deadline" />
                  </Form.Label>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Responsable</Form.Label>
                  <Form.Select name="responsable">
                    {usuarios.map((usuario, i) => (
                      <option key={i} value={usuario.id}>
                        {usuario.nombre} {usuario.apellido}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Supervisor</Form.Label>
                  <Form.Select name="supervisor">
                    {usuarios.map((usuario, i) => (
                      <option key={i} value={usuario.id}>
                        {usuario.nombre} {usuario.apellido}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Footer */}
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
}
