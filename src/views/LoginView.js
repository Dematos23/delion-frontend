import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { login } from "../services/usuarios.service.js";
import { useNavigate } from "react-router-dom";

export default function LoginView() {
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData(e.taget);
    // const dataObject = Object.fromEntries(formData.entries()); // PENDIENTE

    await login();
    navigate("/tareas");
  };

  return (
    <div>
      <Container>
        <Form
          onSubmit={(e) => {
            manejarSubmit(e);
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Ingresar email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>
          <Button
            variant="primary"
            onClick={(e) => {
              manejarSubmit(e);
            }}
          >
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
}
