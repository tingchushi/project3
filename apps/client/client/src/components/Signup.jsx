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

    const [passMatch, setPassMatch] = useState(true);
    const [state, setState] = useState({
      password: "",
      cPassword: ""
    });
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState(' ')
    const [passVal, setPassVal] = useState(' ')
    const navigate = useNavigate();
    
    useEffect(() => {
      validatePassword();
    }, [state]);

    const handleChange = (e) => {
      const { id, value } = e.target;
      setState((prevState) => ({
        ...prevState,
        [id]: value
      }));

      function checkPasswordValidation(value) {
        const isWhitespace = /^(?=.*\s)/;
        if (isWhitespace.test(value)) {
          return "Password must not contain Whitespaces.";
        }
    
    
        const isContainsUppercase = /^(?=.*[A-Z])/;
        if (!isContainsUppercase.test(value)) {
          return "Password must have at least one Uppercase Character.";
        }
    
    
        const isContainsLowercase = /^(?=.*[a-z])/;
        if (!isContainsLowercase.test(value)) {
          return "Password must have at least one Lowercase Character.";
        }
    
    
        const isContainsNumber = /^(?=.*[0-9])/;
        if (!isContainsNumber.test(value)) {
          return "Password must contain at least one Digit.";
        }
    
    
        const isContainsSymbol =
          /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
        if (!isContainsSymbol.test(value)) {
          return "Password must contain at least one Special Symbol.";
        }
    
    
        const isValidLength = /^.{8,16}$/;
        if (!isValidLength.test(value)) {
          return "Password must be 10-16 Characters Long.";
        }
      }
      console.log(state.password)
      setPassVal(checkPasswordValidation(state.password));
    };
    
    const validatePassword = () => {
      if(state.password === state.cPassword){
        setPassMatch(true)
      }else{
        setPassMatch(false);
      } 
    };

    const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = Object.fromEntries(new FormData(event.target));
      console.log(data)

      fetch("http://127.0.0.1:3000/api/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Bad status code from server.');
          } 
          if (response.status !== 200){
            setMsg('Username/Email Existed')
            alert("Invalid Information")
          }
          console.log(response.status)
          return response.json();
        })
      
        .then((data) => {
          if (data.msg) {
            setMessage(data.msg);
            
          } else {
            navigate("/");
            alert("Welcome!!! You have sucessfully registered!")
          }
        });
    };

    function SubmitButton(){
      if (username && email && state.cPassword && state.password){
        if(state.cPassword === state.password){
          return <button className="mb-4 px-5" color='dark' size='lg'>Register</button>
        }else{
          return <button type="button" disabled className="mb-4 px-5" color='dark' size='lg'>Register</button>
        }
      } else {
        // return <MDBBtn type="button" disabled className="mb-4 px-5" color='dark' size='lg'>Register</MDBBtn>
        return <button disabled variant="dark">Sign Up</button> 
      };
    };

    return (
      <form method="post" onSubmit={handleSubmit}>
        <fieldset>
          <br />
          {/* <legend>Sign Up</legend> */}
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
                 <MDBInput name='username' id='username' type='text' value={username} onChange={ e => setUsername(e.target.value)}/>
              </div>
          </label>
          <label>
          Email
          <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput name='email' id='email' type='email' value={email} onChange={ e => setEmail(e.target.value)}/>
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
          </label>
           <div className="input-error">
              {state.password !== state.cPassword ? "" : ""}
              </div>
              <div className="input-error" style={{color:"red"}}>
              {passMatch ? "" : "Error: Passwords do not match"}
              <br/>
             {passVal}
            </div>
          <br />
          <div style={{color:'red'}}>{msg}</div>
          <SubmitButton className="mb-4 px-5" color='dark' size='lg'/>
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
      </form>
    );
  }

export default Signup;


    