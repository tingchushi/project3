import { MDBBtn } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
import ItemList from './ItemList';
import 'react-calendar/dist/Calendar.css';



function dashboard() {
  const [username, setUsername] = useState([]);
  const [role, setRole] = useState([]);
  const [email, setEmail] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(()=>{
    const info = JSON.parse(localStorage.getItem('token'));
    const id = info.token;
    // console.log(info);
    // console.log(id);
    fetch(`http://localhost:3000/api/all/${id}`, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    })
    .then((response) =>  response.json())
    .then((data) => {
      setUsername(data.details.username);
      setEmail(data.details.email);
      setRole(data.details.role);
    });
  },[])

  useEffect(()=>{
    const info = JSON.parse(localStorage.getItem('token'));
  })

    return (
        <>
        <div style={{display:"flex", paddingTop:"50px"}} >
          <div style={{padding: "10px", align:"center"}} >
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{username}</h5>
              <p className="card-text">Email: {email}</p>
              <p className="card-text">Role: {role}</p>
              <button type="button" className="btn btn-primary">Button</button>
            </div>
          </div>
          </div>
          <div style={{padding: "10px", align:"center"}} >
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Access</h5>
              <p className="card-text"></p>
              <p className="card-text"></p>
              <MDBBtn className="btn btn-primary">Button</MDBBtn>
            </div>
          </div>
          </div>
        </div>
        <div className='app'>
      <h1 className='text-center'>Item List</h1>
      <ItemList />
    </div>
   </>
        )
    }
  export default dashboard;