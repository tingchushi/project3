import { useEffect, useState } from "react";
import { React } from "react"
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBCheckbox, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Popup from 'reactjs-popup';
import { Dropdown } from "react-bootstrap";

const Editrole = () => {
  const [data, setData] = useState([])
  const [user, setUser] = useState([])
  const [value, setValue] = useState(data.role);
  const [error, setError] = useState(' ')
  
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

    useEffect(()=>{
      fetch("http://localhost:3000/api/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) =>  response.json())
      .then((data) => {
        setUser(data.msg)
      });
    },[])

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    const handleDelete = (id) => () => {
      fetch(`http://localhost:3000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((req) => {
            if (req.ok){
              setUser(user.filter((user) => user._id !== id));
            }
          })
          .then((data) => console.log(data));
      };


      const handleSubmit= () => {
        event.preventDefault();
        console.log("hello")
        const data = Object.fromEntries(new FormData(event.target));
        console.log(data)
    
    
        fetch(`http://localhost:3000/api/edit/${id}`, {
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
            // window.location.reload(false);
      };


    return (
    <div>
      <br />
      <br />
      <MDBBtn style={{float: 'left'}} href="/dashboard">Back to Dashboard</MDBBtn>
      <br />
      <br />
      <MDBTable className="table" align='middle' style={{border:'inset', borderRadius: '50%'}}>
        <MDBTableHead>
          <tr>
          <th scope='col'>id</th>
          <th scope='col'>Userame</th>
          <th scope='col'>Email</th>
          <th scope='col'>Role</th>
          <th scope='col'>Action</th>
          <th scope='col'>Delete</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
        {user.map((data) => (
            <tr key={data._id}>
              <td>{data._id}</td>
              <td>{data.username}</td>
              <td>{data.email}</td>
              <td>{data.role}</td>
              <td>     
              <Popup contentStyle={{width: "400px"}} trigger={<button> Edit </button>} >
                <form method="post" >
                  <fieldset>
                  <MDBContainer className="my-5" onSubmit={handleSubmit}>                  
                    <MDBCard>
                    Select Role: 
                    <select className="form-select" aria-label="Default select example" value={value} onChange={handleChange}>
                    <option></option>
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </select> 
                    <br />
                    <h6>Role Selected: </h6>
                    <MDBInput wrapperClass='mb-4' label='id' size="lg" name='role' value={value} placeholder={data.role} readonly/>
                    <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Update</MDBBtn>
                    </MDBCard>
                    </MDBContainer>
                  </fieldset>
                  </form>
                  </Popup>
                </td>
                <td><i className="bi bi-trash3-fill" align="right" onClick={handleDelete(data._id)}></i></td>
            </tr>
          ))}
           
        </MDBTableBody>
      </MDBTable>
    </div>
  )
}

export default Editrole
