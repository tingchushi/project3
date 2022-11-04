import { useState, useEffect, useNavigate } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';



function Mainpage (){
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

      // console.log(data)
      // console.log(user)


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
              <td><button>Edit</button></td>
              <td><button onClick={handleDelete(data._id)}>Delete</button></td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

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
      </>
    )
  }

export default Mainpage

