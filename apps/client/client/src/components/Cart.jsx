import { React, useState, useEffect } from 'react'
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon} from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Cart = () => {
  const [ data, setData ] = useState([]);
 
  useEffect(()=>{
    const info = JSON.parse(localStorage.getItem('token'));
    const id = info.token;
    
    fetch(`http://localhost:3000/api/cart/all/${id}`, {
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

// console.log(data[0].itemId.price) 

const handleDelete = (id) => () => {
  fetch(`http://localhost:3000/api/cart/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((req) => {
      if (req.ok){
        setData(data.filter((del, i) => del._id !== id ));
      }
    })
    .then((data) => console.log(data));
};

const sum = data?.reduce((accumulator, object) => {
  return accumulator + object.itemId.price;
}, 0);

console.log(sum);

let counter = []

data.forEach(function(obj) {
    var key = JSON.stringify(obj.itemId)
    counter[key] = (counter[key] || 0) + 1
})

console.log(Object.keys(counter))
const title = (Object.keys(counter))
const show = title.map(({ value, key }) => ({ [key]: value }));
console.log(show);

console.log(Object.values(counter))
  return (
    <div>
       <br /> 
       <br />
       <br />
      <MDBBtn style={{float: 'left'}} href="/dashboard">Back to Dashboard</MDBBtn>
    <br />
    <br />
    <CardGroup>   
    <Card style={{width:"auto"}} align="center">
    <Card.Body >
        <Card.Title>Summary</Card.Title>
        <Card.Text align="left">
       Total: ${sum.toLocaleString()}<br />
       Total Item: 
        </Card.Text>
      </Card.Body>
  </Card>
</CardGroup>
    
    <br />
    <br />
    <div>
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
        Item Name : <br />

          {item.itemId.name}<br /><br />

        Item Description :<br />
        {item.itemId.description}<br /><br />
        Item Price: <br/>
        $ {item.itemId.price}
            </Card.Text>
          </Card.Body>
          <button onClick={handleDelete(item._id)}>Delete</button>
        </Card>
        </div>
        )})}
      </CardGroup>
    </div>
  </div>
    // </div>
  )
}

export default Cart
