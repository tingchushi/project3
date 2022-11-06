import { useEffect, useState } from "react";
import { React } from "react"
import { MDBIcon } from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ItemList () {
  const [data, setData] = useState([])

  const [userRole, setUserRole] = useState(' ')

  useEffect(()=>{
    const info = JSON.parse(localStorage.getItem('token'));
    const id = info.token;
  
    fetch(`http://localhost:3000/api/all/${id}`, {
      method: "GET",
    })
    .then((response) =>  response.json())
    .then((data) => {
      setUserRole(data.role)
      console.log(userRole)

    });
  },[])
    
  useEffect(()=>{
    fetch("http://localhost:3000/api/item", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data)
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
          setData(data.filter((del, i) => del._id !== id ));
          console.log(del)
        }
      })
      .then((data) => console.log(data));
  };

return (
<>
<br />
<br />
<div>
  <h1>Item List</h1>
</div>
<CardGroup style={{    
    alignItems: 'center',
    // flex: '1',
    justifyContent: 'center'}}>
{data.map((item, i)=> {
  return (
<div>
    <Card key={i} style={{width:"304px"}} align="center">
    {userRole === "admin" ? <i className="bi bi-trash3-fill" align="right" onClick={handleDelete(item._id)}></i> : null}
    <MDBIcon far icon="trash-alt" />
    <Card.Body >
      <Card.Title>{item.name}</Card.Title>
      <Card.Text align="left">
      Item ID : <br />
      {item._id}<br /><br />
      Item Description :<br />
      {item.description}<br /><br />
      Item Price: <br/>
      $ {item.price}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      {/* { (dateFormat(new Date().getTime(),"dddd, mmmm dS, yyyy, h:MM:ss TT")) }<br /> */}
      {/* { (dateFormat(new Date(item.createdAt).getTime(), "dddd, mmmm dS, yyyy, h:MM:ss TT"))}  */}
      <small >
       Created { Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / ( 60 * 60 * 24 * 1000) )} days ago<br />
        </small> 
    </Card.Footer>
      <button onClick={handleDelete(item._id)}>Add to Cart</button>
  </Card>
</div>
  )}
)}
</CardGroup>
    </>
  )
}

export default ItemList;