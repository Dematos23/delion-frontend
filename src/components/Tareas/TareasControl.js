import { useState, useEffect } from "react";
import {
  Nav,
  Navbar,
  Container,
  ButtonGroup,
  Stack,
  DropdownButton,
  OverlayTrigger,
  Tooltip,
  ToggleButton,
  Button,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import TareaModal from "./TareaModal.js";
import { estadoForPrisma } from "../../utils/estadoHandler.js";
import Combobox from "react-widgets/Combobox";

export default function TareasControl({
  setActualizarTareas,
  setReq,
  usuarios,
  estados,
  req,
  tareas,
}) {
  const [estado, setEstado] = useState();
  const [responsableId, setResponsableId] = useState();
  const [supervisorId, setSupervisorId] = useState();
  const [deadline, setDeadline] = useState("");

  const [firstRender, setFirstRender] = useState(true);

  const [comboTareas, setComboTareas] = useState([]);

  useEffect(() => {
    const listaTareas = [];
    tareas.map((tarea) => {
      listaTareas.push(tarea.tarea);
      console.log(tarea.tarea);
    });
    setComboTareas(listaTareas);
    // console.log(listaTareas);
    // console.log(comboTareas);
    setFirstRender(false);
  }, []);

  useEffect(() => {
    if (firstRender) {
    } else {
      const newReq = req;
      newReq.estado = estadoForPrisma(estado);
      setReq(newReq);
      setActualizarTareas(true);
    }
  }, [estado]);

  useEffect(() => {
    if (firstRender) {
    } else {
      const newReq = req;
      newReq.responsableId = responsableId;
      setReq(newReq);
      setActualizarTareas(true);
    }
  }, [responsableId]);

  useEffect(() => {
    if (firstRender) {
    } else {
      const newReq = req;
      newReq.supervisorId = supervisorId;
      setReq(newReq);
      setActualizarTareas(true);
    }
  }, [supervisorId]);

  useEffect(() => {
    if (firstRender) {
    } else {
      const newReq = req;
      newReq.deadline = deadline;
      setReq(newReq);
      setActualizarTareas(true);
    }
  }, [deadline]);

  const limpiar = () => {
    if (firstRender) {
    } else {
      const newReq = {
        usuarioId: +localStorage.getItem("usuarioId"),
        orderBy: "deadline",
        sort: "asc",
        estado: ["EN_PROCESO", "EN_REVISION"],
        responsableId: +localStorage.getItem("usuarioId"),
      };
      setReq(newReq);
      setActualizarTareas(true);
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <ButtonGroup vertical>
            <Navbar.Brand>
              <TareaModal
                setActualizarTareas={setActualizarTareas}
                estados={estados}
                usuarios={usuarios}
                tarea={undefined}
              />
            </Navbar.Brand>
            <Navbar.Toggle>
              <i className="bi bi-filter"></i>Filtros
            </Navbar.Toggle>
          </ButtonGroup>

          <Navbar.Collapse>
            <Nav className="me-auto">
              <Stack direction="horizontal" gap={3}>
                {/* <InputGroup>
                  <FormControl type="search" placeholder="Buscar tarea" />
                  <Button variant="outline-secondary">
                    <BsSearch></BsSearch>
                  </Button>
                </InputGroup> */}

                <ButtonGroup vertical={false}>
                  <DropdownButton
                    title="Estado"
                    as={ButtonGroup}
                    variant="secondary"
                  >
                    {estados.map((estado, i) => (
                      <Dropdown.Item key={i} onClick={() => setEstado(estado)}>
                        {estado}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>

                  <DropdownButton
                    title="Responsable"
                    as={ButtonGroup}
                    variant="secondary"
                  >
                    {usuarios.map((usuario, i) => (
                      <Dropdown.Item
                        key={i}
                        onClick={() => setResponsableId(usuario.id)}
                      >
                        {usuario.nombre} {usuario.apellido}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>

                  <DropdownButton
                    title="Supervisor"
                    as={ButtonGroup}
                    variant="secondary"
                  >
                    {usuarios.map((usuario, i) => (
                      <Dropdown.Item
                        key={i}
                        onClick={() => setSupervisorId(usuario.id)}
                      >
                        {usuario.nombre} {usuario.apellido}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </ButtonGroup>

                {/* <ButtonGroup>
                  <Form.Control
                    type="date"
                    name="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </ButtonGroup> */}

                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="tooltipFiltro">Vista inicial.</Tooltip>}
                >
                  <Button variant="outline-primary" onClick={limpiar}>
                    Limpiar
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltipFiltro">
                      Incluir la tareas <strong>completadas</strong>.
                    </Tooltip>
                  }
                >
                  <ToggleButton
                    id="toggle-check"
                    type="checkbox"
                    variant="outline-success"
                    onClick={() =>
                      setEstado(["EN_REVISION", "EN_PROCESO", "COMPLETO"])
                    }
                  >
                    Todo
                  </ToggleButton>
                </OverlayTrigger>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
