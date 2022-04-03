import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView.js";
import TareasView from "./views/TareasView.js";
import BusquedaView from "./views/BusquedaView.js";
import Navegacion from "./components/Navegacion.js";
import ErrorView from "./views/ErrorView.js";

function App() {
  return (
    <div>
      {/* {sesion !== true ? (
        <Router>
          <LoginView></LoginView>
        </Router>
      ) : ( */}
      <Router>
        <Navegacion></Navegacion>
        <Routes>
          <Route path="/" element={<LoginView />}></Route>
          <Route path="/login" element={<LoginView />}></Route>
          {/* <Route path="/tareas" element={<TareasView />}></Route> */}
          <Route path="/busqueda" element={<BusquedaView />}></Route>
          <Route path="*" element={<ErrorView />}></Route>
        </Routes>
      </Router>
      {/* )} */}
    </div>
  );
}

export default App;
