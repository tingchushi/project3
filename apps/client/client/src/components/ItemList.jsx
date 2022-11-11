import { useEffect, useState } from "react";
import { React } from "react"
import { MDBIcon } from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';

function ItemList () {
  const [ data, setData ] = useState([]);
  const [ userRole, setUserRole ] = useState(' ');
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const info = JSON.parse(localStorage.getItem('token'));
  
    const tokens = info.token;
    console.log(tokens)
    
    useEffect(()=>{
      const info = JSON.parse(localStorage.getItem('token'));
      const id = info.token;
      
      fetch(`http://localhost:3000/api/all/${id}`, {
        method: "GET",
      })
      .then((response) => response.json())
      .then((data) => {
        setUserRole(data.role)
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
    
    const handleAddCart = (id) => () => {
      event.preventDefault();
      console.log(id);
      console.log(event.target)
      alert(event.target.value, "Added Successfully")
      fetch(`http://localhost:3000/api/cart/create`, {
        method: "POST",
        body: JSON.stringify({
          userId : tokens,
          itemId : id
        }),
        headers: {
          "Content-Type": "application/json",
        },
        
      })
      .then((req) => {
        if (req.ok){
          console.log(req)
        }
      })
      .then((data) => console.log(data))
    };
  
    return (
<>
<br />
<br />
<div>
  <h1>Item List</h1>
  <div
      aria-live="polite"
      aria-atomic="true"
      style={{ minHeight: '20px' }}
      align = "right"
    >
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Add Item</strong>
              </Toast.Header>
              <Toast.Body>Added Successfully</Toast.Body>
            </Toast>
        </div>
</div>
<CardGroup style={{    
    alignItems: 'center',
    // flex: '1',
    justifyContent: 'center'}}>
{data.map((item, i)=> {
  return (
<div key={i}>
    <Card key={i} style={{width:"304px"}} align="center">
    {userRole === "admin" ? <i className="bi bi-trash3-fill" align="right" onClick={handleDelete(item._id)}></i> : null}
    <MDBIcon far icon="trash-alt" />
    <Card.Body >
      <Card.Title>{item.name}</Card.Title>
      <Card.Text align="left">
      Item ID : <br />
      <div name="itemId">
        {item._id}<br /><br />
        </div>
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
      <button onClick={handleAddCart(item._id, tokens), () => setShow(true)}>Add to Cart</button>
      <ToastContainer />
  </Card>
</div>
  )})}
</CardGroup>


    </>
  )
}

export default ItemList;