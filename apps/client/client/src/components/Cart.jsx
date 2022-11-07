import { React, useState, useEffect } from 'react'
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon} from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Cart = () => {
  const [ data, setData ] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3000/api/cart/all", {
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

console.log(data)

  return (
    <div>
    <br />
    <br />
    <MDBBtn style={{float: 'left'}} href="/dashboard">Back to Dashboard</MDBBtn>
    <br />
    <br />
    <CardGroup style={{    
    alignItems: 'center',
    // flex: '1',
    justifyContent: 'center'}}>
{data.map((item, i)=> {
  return (
<div>
    <Card key={i} style={{width:"304px"}} align="center">
    <MDBIcon far icon="trash-alt" />
    <Card.Body >
      <Card.Title>{item.name}</Card.Title>
      <Card.Text align="left">
      Item ID : <br />
      <div name="itemId">
        {item._id}<br /><br />
        </div>
      Item Description :<br />
      {item.itemId}<br /><br />
      Item Price: <br/>
      $ {item.userId}
      </Card.Text>
    </Card.Body>
      <button onClick={handleAddCart(item._id, tokens)}>Add to Cart</button>
  </Card>
</div>
  )})}
</CardGroup>
    </div>
  )
}

export default Cart
