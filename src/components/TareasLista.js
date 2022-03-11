import { useState } from "react";
import { getTareaId } from "../services/tareas.service.js";
import { Button } from "react-bootstrap";
import TareaCard from "../components/TareaCard.js";

export default function TareasLista() {
  const [tarea, setTarea] = useState();
  const [showCard, setShowCard] = useState(false);
  // {
  //   id: "",
  //   createdAt: "",
  //   updatedAt: "",
  //   tarea: "",
  //   deadline: "",
  //   estado: "",
  //   creadorId: "",
  //   responsableId: "",
  //   supervisorId: "",
  //   archivos: [],
  //   responsable: {
  //     nombre: "",
  //     apellido: "",
  //   },
  //   supervisor: {
  //     nombre: "",
  //     apellido: "",
  //   },
  // }

  const handleClick = async () => {
    const data = await getTareaId(8);
    setTarea(data);
    setShowCard(true);
  };

  return (
    <div>
      {/* <Button onClick={tareas}>Lista de tareas</Button> */}
      <Button onClick={handleClick}>Cargar Tarea</Button>
      {showCard === true ? <TareaCard tarea={tarea}></TareaCard> : <div></div>}
    </div>
  );
}
