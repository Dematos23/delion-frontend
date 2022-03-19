import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

const postArchivo = async (data) => {
  try {
    // const res = await api.post("/archivostareas", data);

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
    // const data = new FormData();
    // data.append("file", file);

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "binary",
      },
      body: file,
    });
    return "se logró";
    // const res = await axios({
    //   method: "put",
    //   url,
    //   data: file,
    // });
    // return res;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw Error("Error al subir archivo a S3");
  }
};

export { postArchivo, postS3 };
