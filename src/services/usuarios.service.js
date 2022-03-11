import axios from "axios";

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

export { login };
