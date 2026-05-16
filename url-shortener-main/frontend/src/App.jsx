import Home from "./pages/Home";
import {Routes,Route} from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import LinkDetails from "./pages/LinkDetails"
import Notfound from "./pages/Notfound";

function App() {
  return (
    <div className="bg-black-950">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/links/:id" element={<LinkDetails />} />
      <Route path="*" element={<Notfound/>} ></Route>
    </Routes>
    <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;
