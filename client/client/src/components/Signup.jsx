import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { React } from "react"
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Signup () {

    // const [message, setMessage] = useState("blank");
    const [countries, setCountries] = useState([]);
    const [passMatch, setPassMatch] = useState(true);
    const [state, setState] = useState({
      email: "",
      password: "",
      cPassword: ""
    });
    const navigate = useNavigate();
    
    useEffect(() => {
      validatePassword();
    }, [state]);

    const activate = true;

    const handleChange = (e) => {
      const { id, value } = e.target;
      setState((prevState) => ({
        ...prevState,
        [id]: value
      }));
    };

    const validatePassword = () => {
      state.password === state.cPassword
        ? setPassMatch(true)
        : setPassMatch(false);
    };

    const createAccount = () =>{
      console.log("createAccount");
      validatePassword();
      
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = Object.fromEntries(new FormData(event.target));
      console.log(data)
  
      fetch("http://localhost:3000/api/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg) {
            setMessage(data.msg);
          } else {
            navigate("/holidays");
          }
        });
    };
    return (
      <form method="post" onSubmit={handleSubmit}>
        <fieldset>
          <br />
          <legend>Sign Up</legend>
          <MDBContainer fluid>
          <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
          <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

          <label>
            Username
          <div className="d-flex flex-row align-items-center mb-4 ">
               	<MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput name='username' id='form1' type='text' className='w-100'/>
              </div>
          </label>
          <label>
          Email
          <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput name='email' id='email' type='email' value={state.email} onChange={handleChange}/>
              </div>
          </label>
          <label>
            Password
          <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput name='password' id='password' type='password' value={state.password} onChange={handleChange}/>
              </div>
          </label>
 
          <label>
          Repeat Password
          <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput  id='cPassword' type='password' value={state.cPassword} onChange={handleChange}/>
              </div>
           <div className="input-error">
              {state.password !== state.cPassword ? "" : ""}
              </div>
              <div className="input-error">
              {passMatch ? "" : "Error: Passwords do not match"}
            </div>
          </label>
          <br />
          <MDBBtn disabled={activate} className="mb-4 px-5" color='dark' size='lg'>Register</MDBBtn>
          </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>
            
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        rel="stylesheet"
        />
      <link
        href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
        rel="stylesheet"
        />

    </MDBContainer>
        </fieldset>
        {/* <p>{message}</p> */}
        
      </form>
    );
  }

export default Signup;


    