
import { useState, useEffect } from 'react';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import Profile from './Profile';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
 const [userRole, setUserRole] = useState(' ')
 
 const navigate = useNavigate();
 const info = JSON.parse(localStorage.getItem('token'));

   const id = info.token;
   useEffect(()=>{
     fetch(`http://localhost:3000/api/all/${id}`, {
       method: "GET",
      })
      .then((response) =>  response.json())
      .then((data) => {
        setUserRole(data.role)
        console.log(userRole)
        
      });
    },[])
    
    return (
  <>
      <Profile />
      <Button variant="primary" size="lg" style={{width:"300px"}} href="/overview">Overview</Button>
      {userRole === "admin" ? <Button variant="dark" size="lg" style={{width:"300px"}} href="/useraccess">User Access</Button> :  <Button disabled variant="secondary\\\" size="lg" style={{width:"300px"}} href="/">User Access</Button>}
      {userRole === "admin" ? <Button variant="success" size="lg" style={{width:"300px"}} href="/itemlist">Item List</Button>:  <Button disabled variant="secondary\\\" size="lg" style={{width:"300px"}} href="/">Item List</Button>}
      <Button variant="info" size="lg" style={{width:"300px"}} href="/cart">Cart</Button>
      {userRole === "admin" ? <AddItemForm /> : <ItemList />}
      {userRole === "admin" ? <ItemList />: <br />}
   </>
        )
    }
  export default Dashboard;