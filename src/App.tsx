import { Route, Routes } from "react-router-dom";
import Editarproductos from "./Pages/Editarproductos";
import Login from "./Pages/Login";
import Menuprincipal from "./Pages/Menuprincipal";
import Nuevoproducto from "./Pages/Nuevoproducto";
import Productos from "./Pages/Productos";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/menuprincipal" element={<Menuprincipal />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/editarproductos" element={<Editarproductos />} />
      <Route path="/nuevoproducto" element={<Nuevoproducto />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
