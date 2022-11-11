import { React, useState, useEffect } from 'react'
import { MDBBtn, MDBIcon} from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Profile from './Profile';

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

// console.log(sum);

let counter = []

data.forEach(function(obj) {
    var key = JSON.stringify(obj.itemId)
    counter[key] = (counter[key] || 0) + 1
})


// const title = (Object.keys(counter))

// console.log(Object.keys(counter))
// console.log(Object.values(counter))
const value = Object.values(counter);

let uId = [];
let iId = []

data?.forEach(function(value, index) {
  uId[index] = value.userId;
  iId[index] = value.itemId.name;
})

// console.log(uId);
// console.log(iId);

const counts = [];
iId.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
// console.log(counts)

let uniqueChars = [...new Set(iId)];

// console.log(uniqueChars);

const country = (value, uniqueChars) => value.map((x, i) => {
  return (
    <li className="list-group-item" key={i}>
      {[x + "ea", " x " + uniqueChars[i]]}<br />
    </li> 
    
)})

  return (
    <div>
      <Profile />
      <MDBBtn style={{float: 'left'}} href="/dashboard">Back to Dashboard</MDBBtn>
       <br />
    <br />
    <CardGroup>   
    <Card style={{width:"auto"}} align="center">
    <Card.Body >
        <Card.Title>Summary</Card.Title>
        <Card.Text align="left">
      <ul className="list-group">
        Total Amount:
       <li className="list-group-item"> ${sum.toLocaleString()}</li><hr />
       </ul>
       Total Item(s): 
       <ul className="list-group">
       {country(value,uniqueChars)}
       </ul>
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
<div key={i}>
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
