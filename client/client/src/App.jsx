import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Mainpage from "./components/Mainpage"
import Layout from "./Layout/Layout"
import Signup from "./components/Signup"
import AdminDashboard from "./components/Dashboard"
import Testing from "./components/Testing"

function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Mainpage />} />
        <Route path="/welcome" element={<AdminDashboard />} />
        <Route path='/testing' element={<Mainpage />} />
      </Route>
     </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
