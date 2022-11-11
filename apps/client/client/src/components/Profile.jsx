
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import GrUserAdmin from '@meronex/icons/gr/GrUserAdmin';
import AiOutlineUser from '@meronex/icons/ai/AiOutlineUser';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [username, setUsername] = useState([]); 
  const [role, setRole] = useState([]);
  const [email, setEmail] = useState([]);
  const [userId, setUserId ] = useState(' ');
  
  const navigate = useNavigate();
  
  useEffect(()=>{
    const info = JSON.parse(localStorage.getItem('token'));
    if (info != null){
      const id = info.token;
      
      fetch(`http://localhost:3000/api/all/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) =>  response.json())
      .then((data) => {
        // console.log(data.role);
        setUsername(data.username)
        setEmail(data.email)
        setRole(data.role)
        setUserId(data._id)
      });
    } else {
      navigate("/");
      window.location.reload(false);
    }
    },[])

    return (
    <>
    <br />
    <br />
    <h1>User Profile</h1>
    <section style={{ backgroundColor: "white" }}>
      <MDBContainer className="py-5">

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4" align="center">
              <MDBCardBody>
                <div className="rounded-circle">
                        {role === "user" ? <AiOutlineUser style={{fontSize: '98px'}} />  : <GrUserAdmin style={{fontSize: '98px'}}/>}
                        <p>{role === "user" ? "Access : User" : "Access : Admin"}</p>
                    </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Username</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>ID</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userId}</MDBCardText>
                  </MDBCol>
                </MDBRow>
     
     
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
   </>
        )
    }
  export default Profile;
