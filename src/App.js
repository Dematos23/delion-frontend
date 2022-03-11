import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView.js";
import TareasView from "./views/TareasView.js";
import Navegacion from "./components/Navegacion.js";

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
          <Route path="/tareas" element={<TareasView />}></Route>
        </Routes>
      </Router>
      {/* )} */}
    </div>
  );
}

export default App;
