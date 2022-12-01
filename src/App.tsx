import { Route, Routes } from "react-router-dom";
import Clientes from "./Pages/Clientes";
import Editarcliente from "./Pages/Editarcliente";
import Editarproductos from "./Pages/Editarproductos";
import Login from "./Pages/Login";
import Menuprincipal from "./Pages/Menuprincipal";
import Nuevocliente from "./Pages/Nuevocliente";
import Nuevoproducto from "./Pages/Nuevoproducto";
import Productos from "./Pages/Productos";
import Reportes from "./Pages/Reportes";
import SignUp from "./Pages/SignUp";
import Ventas from "./Pages/ventas";
import VerReporte from "./Pages/VerReporte";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/menuprincipal" element={<Menuprincipal />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/editarproductos" element={<Editarproductos />} />
      <Route path="/nuevoproducto" element={<Nuevoproducto />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ventas" element={<Ventas />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/editarCliente" element={<Editarcliente />} />
      <Route path="/nuevoCliente" element={<Nuevocliente />} />
      <Route path="/reportes" element={<Reportes />} />
      <Route path="/verreportes" element={<VerReporte />} />
    </Routes>
  );
}

export default App;
