import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Login from "./components/Login"
import Cart from "./components/Cart"
import Layout from "./Layout/Layout"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import Edititem from "./components/Edititem"
import Overview from "./components/Overview"
import Editrole from "./components/Editrole"
import EditPassword from "./components/EditPassword"

function App() {
  const info = JSON.parse(localStorage.getItem('token'));
  
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {info !== null ? <Route path="/dashboard" element={<Dashboard />} /> : <Route index element={<Login />} /> }
        {info !== null ? <Route path="/useraccess" element={<Editrole />} /> : <Route index element={<Login />} /> }
        {info !== null ? <Route path="/overview" element={<Overview />} /> : <Route index element={<Login />} /> }
        {info !== null ? <Route path="/itemlist" element={<Edititem />} /> : <Route index element={<Login />} /> }
        {info !== null ? <Route path="/cart" element={<Cart />} /> : <Route index element={<Login />} /> }
        {info !== null ? <Route path="/editpassword" element={<EditPassword />} /> : <Route index element={<Login />} /> }
        <Route path="/*" element={<Login />} />

      </Route>
     </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
