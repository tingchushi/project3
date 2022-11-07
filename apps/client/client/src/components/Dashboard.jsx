
import { useState, useEffect } from 'react';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import Profile from './Profile';
import Button from 'react-bootstrap/Button';

function Dashboard() {
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

  // useEffect(()=>{
  //   const info = JSON.parse(localStorage.getItem('token'));
  // })

    return (
  <>
      <Profile />
      <Button variant="primary" size="lg" style={{width:"300px"}} href="/overview">Overview</Button>
      {userRole === "admin" ? <Button variant="dark" size="lg" style={{width:"300px"}} href="/useraccess">User Access</Button> :  <Button disabled variant="secondary\\\" size="lg" style={{width:"300px"}} href="/useraccess">User Access</Button>}
      <Button variant="success" size="lg" style={{width:"300px"}} href="/itemlist">Item List</Button>
      {/* <Button variant="warning">Warning</Button>{' '} */}
      {/* <Button variant="danger">Danger</Button>{' '} */}
      <Button variant="info" size="lg" style={{width:"300px"}} href="/cart">Cart</Button>
      {/* <Button variant="light">Light</Button>{' '} */}
      {/* <Button variant="dark">Dark</Button> <Button variant="link">Link</Button> */}
      {userRole === "admin" ? <AddItemForm /> : <ItemList />}
      {userRole === "admin" ? <ItemList />: <br />}
   </>
        )
    }
  export default Dashboard;