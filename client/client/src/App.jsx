import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Mainpage from "./components/Mainpage"
import Layout from "./Layout/Layout"

function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/login" element={<Mainpage />} />
      </Route>
     </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
