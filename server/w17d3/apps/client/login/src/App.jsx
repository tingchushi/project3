// import { useState } from 'react'

// function App() {
//   const [count, setCount] = useState(0)

//   const handleChange = (e) => {
//     const name = e.target.value;
//     console.log(name);
//   }

//   const handleClick = (e) =>{
//     e.preventDefault();
//     console.log("clicked")
//   }

//   return (
//     <div className="App">
//       <form>
//         <label>
//           Name:
//           <input type="text" name="name" onChange={handleChange}/>
//         </label>
        
//         <label>
//           Name:
//           <input type="text" name="name" />
//         </label>
//         <input type="submit" value="Submit" onClick={handleClick}/>
// </form>
//     </div>
//   )
// }

// export default App

import LoginForm from "../components/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateHolidayForm from "../components/CreateHolidayForm";
import Homepage from "../components/LandingPage";
//import LoginForm from "./components/LoginForm";

function App() {
  return (
    <>
  <BrowserRouter>
  <h1>Full Stack</h1>
    <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/Homepage' element={<Homepage/>}/>
      <Route path="/holidays" element={<p>All Holidays</p>} />
      <Route path="/holidays/new" element={<CreateHolidayForm />} />
    </Routes>
  </BrowserRouter>
    </>
    

  );
}

export default App;

