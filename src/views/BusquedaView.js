import BusquedaControl from "../components/Busqueda/BusuqedaControl.js";
import BusquedaLista from "../components/Busqueda/BusquedaLista.js";
import { getMarcas } from "../services/marcas.service.js";
import { useState, useEffect } from "react";

export default function BusquedaView() {
  const [marcas, setMarcas] = useState();
  useEffect(() => {
    const fetch = async () => {
      const dataMarcas = await getMarcas();
      console.log(dataMarcas);
      setMarcas(dataMarcas);
    };
    fetch();
  }, []);
  return (
    <div>
      <BusquedaControl marcas={marcas} setMarcas={setMarcas}></BusquedaControl>
      {/* <BusquedaLista></BusquedaLista> */}
    </div>
  );
}
