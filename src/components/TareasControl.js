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

export default function TareasControl({
  setActualizarTareas,
  usuarios,
  estados,
}) {
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
              />
            </Navbar.Brand>
            <Navbar.Toggle>
              <i className="bi bi-filter"></i>Filtros
            </Navbar.Toggle>
          </ButtonGroup>

          <Navbar.Collapse>
            <Nav className="me-auto">
              <Stack direction="horizontal" gap={3}>
                <InputGroup>
                  <FormControl type="search" placeholder="Buscar tarea" />
                  <Button variant="outline-secondary">
                    <BsSearch></BsSearch>
                  </Button>
                </InputGroup>

                <ButtonGroup vertical={false}>
                  <DropdownButton
                    title="Estado"
                    as={ButtonGroup}
                    variant="secondary"
                  >
                    {estados.map((estado, i) => (
                      <Dropdown.Item key={i}>{estado}</Dropdown.Item>
                    ))}
                  </DropdownButton>

                  <DropdownButton
                    title="Responsable"
                    as={ButtonGroup}
                    variant="secondary"
                  >
                    {usuarios.map((usuario, i) => (
                      <Dropdown.Item key={i} responsableid={usuario.id}>
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
                      <Dropdown.Item key={i} supervisorid={usuario.id}>
                        {usuario.nombre} {usuario.apellido}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </ButtonGroup>

                <ButtonGroup>
                  <Form.Control type="date" name="deadline" />
                </ButtonGroup>

                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltipFiltro">
                      Ver todas las tareas <strong>pendientes</strong>.
                    </Tooltip>
                  }
                >
                  <Button variant="outline-primary">Limpiar</Button>
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
