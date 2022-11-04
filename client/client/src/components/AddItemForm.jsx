
import { React } from "react"
import { useState } from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

function AddItemForm () {
const [error , setError] = useState(' ')
const [data, setData] = useState(' ')
    const handleSubmit = (event) => {
        event.preventDefault();
    
        const data = Object.fromEntries(new FormData(event.target));
        console.log(data)
    
        fetch("http://localhost:3000/api/additem", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
  
          .then((response) => {
              if (response.ok) {
                alert("item added")
                setData(data.filter((del) => del._id !== null));
                useNavigate('/welcome')
              } else {
                setError("Invalid Username/Password");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data);
              localStorage.setItem('token', JSON.stringify(data));
            });
      };
return (
    <div>
<form method="post" onSubmit={handleSubmit}>
<fieldset>
<br />
 <MDBContainer className="my-5">
 <MDBCard>
   <MDBRow className='g-0'>
       <MDBCardBody className='d-flex flex-column'>
           <MDBInput wrapperClass='mb-4' label='name' id='formControlLg' type='text' size="lg" name='name' placeholder="Enter your username"/>
           <MDBInput wrapperClass='mb-4' label='description' id='formControlLg' type='text' size="lg" name="description"placeholder="Enter your password"/>
           <MDBInput wrapperClass='mb-4' label='price' id='formControlLg' type='interger' size="lg" name='price' placeholder="Enter your username"/>
           {/* <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" name="password"placeholder="Enter your password"/> */}
         
         {error}
         <MDBBtn className="mb-4 px-5" color='dark' size='lg' >Login</MDBBtn>
      </MDBCardBody>
   </MDBRow>
 </MDBCard>

 </MDBContainer>
 </fieldset>
       </form>
    </div>
)
}

export default AddItemForm;