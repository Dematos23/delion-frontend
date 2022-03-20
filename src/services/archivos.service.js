import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

const postArchivo = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `${baseUrl}/archivostareas`,
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw Error("Error al subir archivo");
  }
};

const postS3 = async (url, file) => {
  try {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/pdf",
      },
      body: file,
    });
    return "se subió el archivo";
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw Error("Error al subir archivo a S3");
  }
};

const deleteS3 = async (id, nombre) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${baseUrl}/archivostareas`,
      data: { id: +id, nombre: nombre },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // await fetch(`${baseUrl}/archivostareas`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: { id: id, nombre: nombre },
    // });
    return res;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw Error("Error al eliminar archivo a S3");
  }
};

export { postArchivo, postS3, deleteS3 };
