import { useState, useEffect, useNavigate } from 'react';
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
  MDBTable,
  MDBTableHead,
  MDBTableBody
}
from 'mdb-react-ui-kit';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FcFactoryBreakdown } from 'react-icons/fc';



function Edititem (){
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  
    useEffect(()=>{
      fetch("http://localhost:3000/api/item", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) =>  response.json())
      .then((data) => {
        setData(data)
      });
    },[])

    const handleDelete = (id) => () => {
      fetch(`http://localhost:3000/api/deleteItem/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((req) => {
            if (req.ok){
              setData(data.filter((data) => data._id !== id));
            }
          })
          .then((data) => console.log(data));
      };

      const handleSubmit = (e) => {
        if (e && e.preventDefault) { // add?
          e.preventDefault();
          e.persist();
      }
        
        const data = Object.fromEntries(new FormData(e.target));
        console.log(data)
    
        fetch(`http://localhost:3000/api/edit/${id}`, {
          method: "put",
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
              localStorage.setItem('token', JSON.stringify(data));
              const info = JSON.parse(localStorage.getItem('token'));
              console.log(info);
  
            });
      };

    return (
    <>
    <br />
    <br />
    <MDBBtn style={{float: 'left'}} href="/dashboard">Back to Dashboard</MDBBtn>
    <br />
    <br />
    <div style={{justifyContent:"center"}} >
    <MDBTable className="table" align='middle' style={{border:'inset'}}>
        <MDBTableHead>
          <tr>
          <th scope='col'>id</th>
          <th scope='col'>Name</th>
          <th scope='col'>Description</th>
          <th scope='col'>Price</th>
          <th scope='col'>Creation Date</th>
          <th scope='col'>Updata Item</th>
          <th scope='col'>Remove</th>
          </tr>
        </MDBTableHead>
    
        <MDBTableBody>
          {data.map((data) => (
            <tr key={data._id}>
              <td>{data._id}</td>
              <td>{data.name}</td>
              <td>{data.description}</td>
              <td>{data.price}</td>
              <td>{data.createdAt}</td>
              <td>    
                <div>
                <form method="post" onSubmit={handleSubmit}>
                  <fieldset>
                  <Popup contentStyle={{width: "300px"}} trigger={<button> Edit </button>} >
                  <MDBContainer className="my-5">
                    <MDBCard>
                    <MDBInput wrapperClass='mb-4' label='name' type='text' size="lg" name='name' placeholder="Item Name"/>
                    <MDBInput wrapperClass='mb-4' label='description' type='text' size="lg" name="description"placeholder="Item Description"/>
                    <MDBInput wrapperClass='mb-4' label='price' type='interger' size="lg" name='price' placeholder="$Price"/>
                    <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Update</MDBBtn>
                    </MDBCard>
                    </MDBContainer>
                  </Popup>
                  </fieldset>
                  </form>
                </div></td>
              <td><button onClick={handleDelete(data._id)}>Delete</button></td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      
    </div>
      </>
    )
  }

export default Edititem;