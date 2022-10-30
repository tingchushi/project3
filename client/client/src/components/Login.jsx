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
import { FcFactoryBreakdown } from 'react-icons/fc';

function LoginForm() {
    const [error, setError] = useState(" ");
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = Object.fromEntries(new FormData(event.target));
  
      fetch("http://localhost:3000/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

        .then((response) => {
            if (response.ok) {
              navigate("/dashboard");
            } else {
              setError("Invalid Username/Password");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          });
    };
    
  
    return (
        <>
<form method="post" onSubmit={handleSubmit}>
<fieldset>
<br />
 <MDBContainer className="my-5">
 <MDBCard>
   <MDBRow className='g-0'>

     <MDBCol md='6'>
       <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
     </MDBCol>

     <MDBCol md='6'>
       <MDBCardBody className='d-flex flex-column'>

         <div className='d-flex flex-row mt-2'>
           <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
           <span className="h1 fw-bold mb-0" style={{letterSpacing: '10px'}}><FcFactoryBreakdown /></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
         </div>

         {/* <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5> */}

           <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg" name='username'/>
           <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" name="password"/>

         <MDBBtn className="mb-4 px-5" color='dark' size='lg' >Login</MDBBtn>
         <a className="small text-muted" href="#!">Forgot password?</a>
         <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="/signup" style={{color: '#393f81'}}>Register Here</a></p>

         <div className='d-flex flex-row justify-content-start'>
           <a href="#!" className="small text-muted me-1">Terms of use.</a>
           <a href="#!" className="small text-muted">Privacy policy</a>
         </div>

      </MDBCardBody>
     </MDBCol>

   </MDBRow>
 </MDBCard>

 </MDBContainer>
 </fieldset>
       </form>
     
        </>
    );
  }
  
  export default LoginForm;
  