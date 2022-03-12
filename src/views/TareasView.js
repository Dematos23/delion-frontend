import { useState, useEffect } from "react";
import { getTareas } from "../services/tareas.service.js";
import TareasLista from "../components/TareasLista.js";
import TareasControl from "../components/TareasControl.js";
import { Button, Row, Col } from "react-bootstrap";
import { getUsuarios } from "../services/usuarios.service.js";

export default function TareasView() {
  const [tareas, setTareas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const reqInicial = {
    usuarioId: +localStorage.getItem("usuarioId"),
    orderBy: "deadline",
    sort: "asc",
    estado: ["EN_PROCESO", "EN_REVISION"],
    // responsableId: 12,
  };
  const [req, setReq] = useState(reqInicial);
  const [actualizarTareas, setActualizarTareas] = useState(true);
  const estados = ["En proceso", "En revisión", "Completo"];

  useEffect(() => {
    const fetch = async () => {
      const dataUsuarios = await getUsuarios();
      setUsuarios(dataUsuarios);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const dataTareas = await getTareas(req);
      setTareas(dataTareas);
    };
    if (actualizarTareas === true) {
      fetch();
      setActualizarTareas(false);
    }
  }, [actualizarTareas]);

  return (
    <div>
      <TareasControl
        setActualizarTareas={setActualizarTareas}
        usuarios={usuarios}
        estados={estados}
      ></TareasControl>
      <TareasLista tareas={tareas}></TareasLista>
    </div>
  );
}
