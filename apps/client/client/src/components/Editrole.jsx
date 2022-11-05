import React from 'react'

const Editrole = () => {
    const [user, setUser] = useState([])
    
    useEffect(()=>{
        fetch("http://localhost:3000/api/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) =>  response.json())
        .then((data) => {
          setUser(data.msg)
        });
      },[])
    return (
    <div>
            <MDBTable className="table" align='middle' style={{border:'inset', borderRadius: '50%'}}>
        <MDBTableHead>
          <tr>
          <th scope='col'>id</th>
          <th scope='col'>Userame</th>
          <th scope='col'>Email</th>
          <th scope='col'>Role</th>
          <th scope='col'>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
        {user.map((data) => (
            <tr key={data._id}>
              <td>{data._id}</td>
              <td>{data.username}</td>
              <td>{data.email}</td>
              <td>{data.role}</td>
              <td><MDBBtn>Edit</MDBBtn></td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  )
}

export default Editrole
