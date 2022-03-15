import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { postTarea, putTarea } from "../services/tareas.service.js";
import { format } from "date-fns";

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
  };

  const handleShow = () => {
    if (!(tarea === undefined)) {
      tarea.deadline = format(+new Date(tarea.deadline), "yyyy-MM-dd");
    }
    setShow(true);
  };

  const addDay = (fechaValue, cantidadDias) => {
    const fecha = new Date(fechaValue);
    fecha.setDate(fecha.getDate() + cantidadDias);
    return fecha;
  };

  // const responsableDefault =
  //   tarea.responsable.nombre + tarea.responsable.apellido;

  // Submit
  const postSubmit = async (e) => {
    e.preventDefault();
    const tareaData = new FormData(e.target);
    const tareaObjt = Object.fromEntries(tareaData.entries());
    e.target.responsable.getAttribute("responsableid");
    tareaObjt.deadline = addDay(e.target.deadline.value, 1);
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
  const putSubmit = async (e) => {
    e.preventDefault();
    const tareaData = new FormData(e.target);
    const tareaObjt = Object.fromEntries(tareaData.entries());
    tareaObjt.tarea = e.target.tarea.value;
    tareaObjt.descripcion = e.target.descripcion.value;
    e.target.responsable.getAttribute("responsableid");
    tareaObjt.deadline = addDay(e.target.deadline.value, 1);
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
    tareaObjt.usuarioId = +localStorage.getItem("usuarioId");
    console.log(tareaObjt);
    await putTarea(+tarea.id, tareaObjt);
    setActualizarTareas(true);
  };

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
                  postSubmit(e);
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
                    Crear Tarea
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <>
          <Button variant="secondary" onClick={handleShow} className="mt-3">
            Editar
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  putSubmit(e);
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Tarea</Form.Label>
                  <Form.Control
                    type="string"
                    name="tarea"
                    defaultValue={tarea.tarea}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    defaultValue={tarea.descripcion}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    defaultValue={tarea.estado}
                    name="estado"
                    as="select"
                  >
                    {estados.map((estado, i) => (
                      <option key={i}>{estado}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label label="Deadline">
                    Deadline
                    <Form.Control
                      type="date"
                      name="deadline"
                      defaultValue={tarea.deadline}
                    />
                  </Form.Label>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Responsable</Form.Label>
                  <Form.Control name="responsable" as="select">
                    {usuarios.map((usuario, i) => {
                      if (
                        tarea.responsable.nombre === usuario.nombre &&
                        tarea.responsable.apellido === usuario.apellido
                      ) {
                        return (
                          <option key={i} value={usuario.id} selected>
                            {usuario.nombre} {usuario.apellido}
                          </option>
                        );
                      } else {
                        return (
                          <option key={i} value={usuario.id}>
                            {usuario.nombre} {usuario.apellido}
                          </option>
                        );
                      }
                    })}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Supervisor</Form.Label>
                  <Form.Control name="supervisor" as="select">
                    {usuarios.map((usuario, i) => {
                      if (
                        tarea.supervisor.nombre === usuario.nombre &&
                        tarea.supervisor.apellido === usuario.apellido
                      ) {
                        return (
                          <option key={i} value={usuario.id} selected>
                            {usuario.nombre} {usuario.apellido}
                          </option>
                        );
                      } else {
                        return (
                          <option key={i} value={usuario.id}>
                            {usuario.nombre} {usuario.apellido}
                          </option>
                        );
                      }
                    })}
                  </Form.Control>
                </Form.Group>

                {/* Footer */}
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Guardar
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
