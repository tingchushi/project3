import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { React } from "react"
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
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import dateFormat from 'dateformat';

function ItemList () {
  const [data, setData] = useState([])
  const [date, setDate] = useState(' ')
  
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
      setDate(data.createdAt)

    });
  },[])


const handleClick = (e) =>{
	e.preventDefault();
	console.log("clicked")
} 

var today = new Date();
// var Christmas = new Date(today.getFullYear() + "-12-25");
// var diffMs = (date - today); // milliseconds between now & Christmas
// var diffDays = Math.floor(diffMs / 86400000); // days
// var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
// var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
// console.log(diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes until Christmas =)");

let diff = today - "Sunday, October 30th, 2022, 11:37:47 AM"
console.log(diff)

// console.log(date)
// let newDate = new Date();
// var today = (dateFormat(newDate,"dddd, mmmm dS, yyyy, h:MM:ss TT" ));

return (
<>
<div>
<CardGroup style={{width:"100%"}}>
{data.map((item, i)=> {
  return (
    <Card style={{width:"25rem", padding:"10px"}} key={i}>
    {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
    <Card.Body>
      <Card.Title>{item.name}</Card.Title>
      <Card.Text>
      {item.description}<br />
      {item.price}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      { (dateFormat(new Date(),"dddd, mmmm dS, yyyy, h:MM:ss TT")) }<br />
      { (dateFormat(item.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT"))} 
      {/* <small className="text-muted">Last updated 3 mins ago</small> */}
    </Card.Footer>
  </Card>
  )}
)}
</CardGroup>
<MDBInput></MDBInput>
<MDBBtn onClick={handleClick}></MDBBtn>
</div>
{/* {{newDate}} */}
</>
)
}

export default ItemList;