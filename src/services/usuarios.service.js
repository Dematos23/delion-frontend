import axios from "axios";
import api from "./api/tareas.js";

const req = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
});

const login = async () => {
  try {
    const res = await req.post("/login", {
      email: "dmatos@estudiodelion.com.pe",
      password: "Estudio123.",
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("usuarioId", res.data.usuarioId);
  } catch (error) {
    throw Error("Error al hacer login");
  }
};

const getUsuarios = async () => {
  try {
    const res = await api.get("/usuarios");
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw Error("Error al consultar usuarios");
  }
};

export { login, getUsuarios };
