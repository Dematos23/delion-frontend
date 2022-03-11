import axios from "axios";

const req = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const getTareas = async () => {
  try {
    const res = await req.get("/tareas", {
      usuarioId: 1,
      orderBy: "tarea",
      sort: "asc",
      estado: ["EN_PROCESO"],
    });
    console.log(res.data);
  } catch (error) {
    throw Error("Error al consultar tareas");
  }
};

const getTareaId = async (id) => {
  try {
    const res = await req.get(`/tareas/${id}`);
    return res.data;
  } catch (error) {
    throw Error("Error al consultar tareas");
  }
};

export { getTareas, getTareaId };
