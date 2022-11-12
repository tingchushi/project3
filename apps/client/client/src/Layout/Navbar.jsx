import 'bootstrap/dist/css/bootstrap.min.css'
import { FcFactoryBreakdown } from 'react-icons/fc';
import { useState, useEffect, useRef } from 'react'
import { redirect } from 'react-router-dom';

function Navbar1() {
    const [userRole, setUserRole] = useState(' ')
    const [uName, setUName] = useState(' ')
    
    const handleLogout = () =>{
        localStorage.clear();
        alert("Logout Successfully")
    }

    useEffect(()=>{
      if(JSON.parse(localStorage.getItem('token')) === null ){
        redirect('/signup') ;
      } else {
        const info = JSON.parse(localStorage.getItem('token'));
        const id = info.token;
        // console.log(id)
          fetch(`http://localhost:3000/api/all/${id}`, {
              method: "GET",
            })
            .then((response) =>  response.json())
            .then((data) => {
                setUserRole(data?.role)
                setUName(data?.username)
                // console.log(userRole)
            });   
        }
    },[])
    

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg" style={{backgroundColor:"white", color:"white"}}>
    <div className="container">
        {userRole === null ? <a className="navbar-brand" href="/"><FcFactoryBreakdown style={{color: 'red', fontSize: '50px'}}/></a> : <a className="navbar-brand" href="/dashboard"><FcFactoryBreakdown style={{color: 'red', fontSize: '50px'}}/></a>}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    {userRole === "admin" || userRole === "user" ? <a className="nav-link" aria-current="page" href="/dashboard">Hi, {uName}</a> : <a className="nav-link" aria-current="page" href="/">Home</a> }
                </li>
                <li className="nav-item">
                {userRole === "admin" || userRole === "user" ? <br /> : <a className="nav-link" aria-current="page" href="/signup">Registration</a> }
                </li>
                <li>
                {userRole === "admin" || userRole === "user" ? <a className="nav-link" aria-current="page" href="/editpassword">Setting</a> : <br /> }
                </li>
                <li className="nav-item">
                    {userRole === ' ' ? <br/> :<a className="nav-link" href="/" onClick={handleLogout}>Logout</a>}
                </li>
            </ul>
        </div>
    </div>
</nav>

    </>
  );
}

export default Navbar1;
