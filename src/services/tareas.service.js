import api from "./api/tareas.js";
import add from "date-fns/add";

const getTareas = async (data) => {
  try {
    const res = await api.post("/tareas", data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw Error("Error al consultar tareas");
  }
};

const getTareaId = async (id) => {
  try {
    const res = await api.get(`/tareas/${id}`);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw Error("Error al consultar tareas");
  }
};

const postTarea = async (data) => {
  try {
    const res = await api.post(`/tarea`, data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw Error("Error al crear tarea");
  }
};

export { getTareas, getTareaId, postTarea };
