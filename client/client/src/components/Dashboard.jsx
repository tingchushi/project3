
import { useState, useEffect } from 'react';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import Profile from './Profile';
import Button from 'react-bootstrap/Button';

function Dashboard() {
 
  useEffect(()=>{
    const info = JSON.parse(localStorage.getItem('token'));
    const id = info.token;
  
    fetch(`http://localhost:3000/api/all/${id}`, {
      method: "GET",
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data)
    });
  },[])

  useEffect(()=>{
    const info = JSON.parse(localStorage.getItem('token'));
  })
  
    return (
  <>
      <Profile />
      <Button variant="primary">Overview</Button>{' '}
      <Button variant="secondary" href="/useraccess">User Access</Button>{' '}
      <Button variant="success" href="/itemlist">Item List</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button>{' '}
      <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button>{' '}
      {/* <Button variant="dark">Dark</Button> <Button variant="link">Link</Button> */}
      <AddItemForm />
      <ItemList />
   </>
        )
    }
  export default Dashboard;