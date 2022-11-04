
import { useState, useEffect } from 'react';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import Profile from './Profile';

function dashboard() {

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
      <AddItemForm />
      <ItemList />
   </>
        )
    }
  export default dashboard;