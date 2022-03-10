import axios from "axios";

const URL = process.env.REACT_APP_API;

const login = async ()=>{
    try {
        const loginReq = {
        method: 'post',
           url: `${URL}/login`,
        data: {
          email: "dmatos@estudiodelion.com.pe",
          password: "Estudio123."
      },}
        const {usuario}=await axios(loginReq)
        axios({
            method: 'post',
            url: baseUrl + 'applications/' + appName + '/dataexport/plantypes' + plan,
            headers: {}, 
            data: {
              foo: 'bar', // This is the body part
            }
          });
        console.log(usuario);
        return usuario;
    } catch (error) {
        throw
    }
}