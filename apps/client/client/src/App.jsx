import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Cart from "./components/Cart"
import Layout from "./Layout/Layout"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import Edititem from "./components/Edititem"
import Overview from "./components/Overview"
import Editrole from "./components/Editrole"

function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/useraccess" element={<Editrole />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/itemlist" element={<Edititem />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
     </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
