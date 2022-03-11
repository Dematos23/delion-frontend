import { getTareas } from "../services/tareas.service.js";
import TareasLista from "../components/TareasLista.js";

export default function TareasView() {
  const tareas = () => getTareas([]);

  return (
    <div>
      <h1>Tareas</h1>
      <TareasLista></TareasLista>
    </div>
  );
}
