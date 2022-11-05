import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { FaBeer } from "@react-icons/all-files/fa/FaBeer"
import { FcFactoryBreakdown } from 'react-icons/fc';

function Navbar1() {
    const handleLogout = () =>{
        localStorage.clear();
        alert("Logout Successfully")
    }

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
                    <a className="nav-link" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/signup">Registration</a>
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
