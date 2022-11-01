import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import AdminDashboard from './AdminDasboard';

function Mainpage (){
  const [data, setData] = useState([])
  const [user, setUser] = useState([])
  const [authenticated, setauthenticated] = useState(null);
  
    useEffect(()=>{
      fetch("http://localhost:3000/api/item", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
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
        // body: JSON.stringify(data),
      })
      .then((response) =>  response.json())
      .then((data) => {
        setUser(data.msg)
      });
    },[])


      console.log(data)
      console.log(user)
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
  if (!authenticated) {
    return <useNavigate replace to="/" />;
  } else {
    return (
        <div>
            <h1>Item List</h1>  

    <MDBTable className="table" align='middle'>
        <MDBTableHead>
          <tr>
          <th scope='col'>id</th>
          <th scope='col'>Name</th>
          <th scope='col'>Description</th>
          <th scope='col'>Price</th>
          <th scope='col'>Creation Date</th>
          <th scope='col'>Action</th>
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
              <td><MDBBtn>Edit</MDBBtn></td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      {/* <h1>{user}</h1> */}
      <MDBTable className="table" align='middle'>
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
}

export default Mainpage
