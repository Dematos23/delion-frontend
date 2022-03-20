import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Button } from "bootstrap";

export default function Navegacion() {
  return (
    <div>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        collapseOnSelect
      >
        <Container fluid>
          <Navbar.Brand>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <h2>Estudio Delion</h2>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              {/* <Nav.Link eventKey="1" as={Link} to="/DashboardView">
                Dashboard
              </Nav.Link> */}
              <Nav.Link eventKey="2" as={Link} to="/tareas">
                Tareas
              </Nav.Link>
              {/* <Nav.Link eventKey="3" as={Link} to="/CajaView">
                Tesoreria
              </Nav.Link>
              <Nav.Link eventKey="4" as={Link} to="/ProcesosView">
                Procesos
              </Nav.Link>
              <Nav.Link eventKey="5" as={Link} to="/CrmView">
                CRM
              </Nav.Link>
              <Nav.Link eventKey="6" as={Link} to="/FacturacionView">
                Facturacion
              </Nav.Link>
              <Nav.Link eventKey="7" as={Link} to="/LogisticaView">
                Logística
              </Nav.Link> */}
              <Nav.Link eventKey="8" as={Link} to="/Busqueda">
                Búsqueda
              </Nav.Link>
            </Nav>
            {/* <Button>hola</Button> */}
            <Link
              // as={Link}
              onClick={console.log("hi")}
              to="/login"
              style={{ textDecoration: "none" }}
            >
              Sign Out
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
