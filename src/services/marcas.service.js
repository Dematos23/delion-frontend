import api from "./api/marcas.js";

const getMarcas = async (data) => {
  try {
    const res = await api.get("/marcas", data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw Error("Error al consultar marcas");
  }
};

const postMarca = async (data) => {
  try {
    const res = await api.post("/marca", data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw Error("Error al registrar marca");
  }
};

const postMarcas = async (data) => {
  try {
    const res = await api.post("/marcas", data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw Error("Error al registrar marcas");
  }
};

const deleteMarca = async (id, data) => {
  try {
    const res = await api.delete(`/marca/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw Error("Error al eliminar marca");
  }
};

export { getMarcas, postMarca, postMarcas, deleteMarca };
