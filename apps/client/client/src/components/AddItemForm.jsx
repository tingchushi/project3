
import { React } from "react"
import { useState } from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon} from 'mdb-react-ui-kit';

function AddItemForm () {
const [error , setError] = useState(' ')
    
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
  
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });
      };

     const handleClick = () =>{
      console.log("testing")
      window.location.reload(false);
     }
return (
<div>
    <form method="post" onSubmit={handleSubmit}>
    <fieldset>
    <MDBContainer className="my-5">
     <MDBCard>
      <h1>Add new item</h1>
      <MDBRow className='g-0'>
       <MDBCardBody className='d-flex flex-column'>
           <MDBInput wrapperClass='mb-4' label='name' type='text' size="lg" name='name' placeholder="Item Name"/>
           <MDBInput wrapperClass='mb-4' label='description' type='text' size="lg" name="description"placeholder="Item Description"/>
           <MDBInput wrapperClass='mb-4' label='price' type='interger' size="lg" name='price' placeholder="$Price"/>
                  {error}
              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleClick}>Add Item</MDBBtn>
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