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
    const navigate = useNavigate();
  
    // useEffect(() => {
    //   const fetchCountries = async () => {
    //     const req = await fetch("/api/countries");
    //     const data = await req.json();
    //     setCountries(data);
    //   };
    //   fetchCountries();
    // }, []);
  
    const notOk = false;
  
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
          <legend>Sign Up</legend>

          <label>
            Name:
          <MDBInput wrapperClass='mb-4' type='text' size="lg" name="username" />
          </label>
          <br />
          <label>
            Email:
            <MDBInput wrapperClass='mb-4' type='email' size="lg" name="email" />
          </label>
          <br />
          <label>
            Password:
            <MDBInput wrapperClass='mb-4' type='password' size="lg" name="password" />
          </label>
          <br />
          <br />
          <br />
          <button>Create Holiday</button>
        </fieldset>
        {/* <p>{message}</p> */}
      </form>
    );
  }

export default Signup