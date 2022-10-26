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
    // const [signUp, setSignUp] = useState({});
    // const [error, setError] = useState(" ");
    // const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = Object.entries(MDBContainer);

      console.log(data)
      fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      })


        .then((response) => {
            if (response.ok) {
              navigate("/dashboard");
            } else {
            //   setError("Invalid Username/Password");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          });
    };
    
    return (
        <>


<MDBContainer fluid>

<MDBCard className='text-black m-5' style={{borderRadius: '25px'}} onClick={handleSubmit}>
  <MDBCardBody>
    <MDBRow>
      <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
        <div className="d-flex flex-row align-items-center mb-4 " name="username">
          <MDBIcon fas icon="user me-3" size='lg'/>
          <MDBInput name='username' id='form1' type='text' className='w-100'/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4" email="email">
          <MDBIcon fas icon="envelope me-3" size='lg'/>
          <MDBInput name='email' id='form2' type='email'/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="lock me-3" size='lg'/>
          <MDBInput name='password' id='form3' type='password' password="password"/>
        </div>

        {/* <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="key me-3" size='lg'/>
          <MDBInput label='Repeat your password' id='form4' type='password'/>
        </div> */}

        <div className='mb-4'>
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
        </div>

        <MDBBtn className='mb-4' size='lg'>Register</MDBBtn>

      </MDBCol>

      <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
      </MDBCol>

    </MDBRow>
  </MDBCardBody>
</MDBCard>
</MDBContainer>
 </>
    )
}

export default Signup



    