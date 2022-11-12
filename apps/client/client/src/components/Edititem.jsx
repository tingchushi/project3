import { useState, useEffect} from 'react';
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
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Profile from "./Profile";


function Edititem (){
  const [data, setData] = useState([]);
  const [error, setError] = useState(' ')
  const navigate = useNavigate();
  // const [update, setUpdate] = useState(' ');

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

      const handleSubmit = () => {
        event.preventDefault();
        console.log(event)
        console.log("hello")
        const data = Object.fromEntries(new FormData(event.target));
        console.log(data._id)
    
        fetch(`http://localhost:3000/api/updateitem/${data._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
  
          .then((response) => {
              if (response.ok) {
                navigate("/itemlist");
              } else {
                setError("Invalid input");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data); 
            });
            window.location.reload(false);
      };

    return (
    <>
    <Profile />
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
          {/* <th scope='col'>Remove</th> */}
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
                  <Popup contentStyle={{width: "400px"}} trigger={<button> Edit </button>} >
                <form method="post" onSubmit={handleSubmit}>
                  <fieldset>
                  <MDBContainer className="my-5">
                    <MDBCard>
                    <MDBInput wrapperClass='mb-4' label='id' size="lg" name='_id' value={data._id} readonly/>
                    <MDBInput wrapperClass='mb-4' label='name' type='text' size="lg" name='name' placeholder="Item Name"/>
                    <MDBInput wrapperClass='mb-4' label='description' type='text' size="lg" name="description"placeholder="Item Description"/>
                    <MDBInput wrapperClass='mb-4' label='price' type='interger' size="lg" name='price' placeholder="$Price"/>
                    <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Update</MDBBtn>
                    </MDBCard>
                    </MDBContainer>
                  </fieldset>
                  </form>
                  </Popup>
                </div></td>
              {/* <td><button onClick={handleDelete(data._id)}>Delete</button></td> */}
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      
    </div>
      </>
    )
  }

export default Edititem;