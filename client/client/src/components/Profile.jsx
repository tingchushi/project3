
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import GrUserAdmin from '@meronex/icons/gr/GrUserAdmin';
import AiOutlineUser from '@meronex/icons/ai/AiOutlineUser';

function Profile() {
  const [username, setUsername] = useState([]); 
  const [role, setRole] = useState([]);
  const [email, setEmail] = useState([]);
  const [userId, setUserId ] = useState(' ');

  
  useEffect(()=>{
      const info = JSON.parse(localStorage.getItem('token'));
      const id = info.token;

    fetch(`http://localhost:3000/api/all/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) =>  response.json())
    .then((data) => {
        console.log(data);
        setUsername(data.username)
        setEmail(data.email)
        setRole(data.role)
        setUserId(data._id)
    });
  },[])

  useEffect(()=>{
    const info = JSON.parse(localStorage.getItem('token'));
  })

    return (
        <>
        <CardGroup >
            <Card >
            <Card.Body className="text-start">
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                    <img src="..." alt="..." className="img-thumbnail"></img>
                    </div>
                    <div className="col-sm">
                        <p className="card-title">Username: {username}</p>
                        <p className="card-title">Email: {email}</p>
                        <p className="card-title">Id: {userId}</p>
                    </div>
                    <div className="col-sm">
                    <div className='text-center'>
                        Access: {role}
                    </div>
                    <div className='text-center'>
                        {role === "user" ? <AiOutlineUser style={{fontSize: '50px', paddingTop:"10px"}} /> : <GrUserAdmin style={{fontSize: '50px', paddingTop:"10px"}}/>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
            <div className="row">
                <div className="col-sm">
                
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">

              </div>
            </div>
            </Card.Body>
        </Card>
        </CardGroup>
   </>
        )
    }
  export default Profile;