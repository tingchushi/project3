import { useEffect, useState } from "react";
import { React } from "react"
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBCheckbox, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const Editrole = () => {
  const [data, setData] = useState([])
  const [user, setUser] = useState([])
  const [holidays, setHolidays] = useState([]);
  
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
          </tr>
        </MDBTableHead>
        <MDBTableBody>
        {user.map((data) => (
            <tr key={data._id}>
              <td>{data._id}</td>
              <td>{data.username}</td>
              <td>{data.email}</td>
              <td>{data.role}</td>
              <td><MDBBtn>Edit</MDBBtn></td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  )
}

export default Editrole
