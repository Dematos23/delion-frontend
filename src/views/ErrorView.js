import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function ErrorView() {
  return (
    <Container>
      <img
        src="https://www.maxpixel.net/static/photo/1x/Error-404-Error-404-Error-1252056.png"
        alt="Error Page Not Found"
      />
      <br />
      <Link to="/">
        <h1>Regresar</h1>
      </Link>
    </Container>
  );
}
