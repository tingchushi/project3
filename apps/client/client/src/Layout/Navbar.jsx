import 'bootstrap/dist/css/bootstrap.min.css'
import { FcFactoryBreakdown } from 'react-icons/fc';
import { useState, useEffect, useRef } from 'react'

function Navbar1() {
    const [userRole, setUserRole] = useState(' ')
    
    const handleLogout = () =>{
        localStorage.clear();
        alert("Logout Successfully")
    }

    useEffect(()=>{
      if(JSON.parse(localStorage.getItem('token')) == null ){
        return;
      } else {
        const info = JSON.parse(localStorage.getItem('token'));
        const id = info.token;
        console.log(id)
          fetch(`http://localhost:3000/api/all/${id}`, {
              method: "GET",
            })
            .then((response) =>  response.json())
            .then((data) => {
                setUserRole(data.role)
                this.setUserRole(data.role, callback);
                console.log(userRole)
                // window.location.reload(false);
            });   
        }
    },[])
    

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg" style={{backgroundColor:"white", color:"white"}}>
    <div className="container">
        <a className="navbar-brand" href="/"><FcFactoryBreakdown style={{color: 'red', fontSize: '50px'}}/></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    {userRole === "admin" || userRole === "user" ? <a className="nav-link" aria-current="page" href="/dashboard">Hi, {userRole}</a> : <a className="nav-link" aria-current="page" href="/">Home</a> }
                </li>
                <li className="nav-item">
                {userRole === "admin" || userRole === "user" ? <a className="nav-link" aria-current="page" href="/"></a> : <a className="nav-link" aria-current="page" href="/signup">Registration</a> }
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/" onClick={handleLogout}>Logout</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

    </>
  );
}

export default Navbar1;
