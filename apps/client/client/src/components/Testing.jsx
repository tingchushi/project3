import {useEffect, useState} from 'react'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const Testing = () => {
    const [data, setData] = useState([]) 
    
    
    useEffect(()=>{
        const info = JSON.parse(localStorage.getItem('token'));
        const id = info.token;
      console.log(id)
      console.log(info)
  
      fetch(`http://localhost:3000/api/all/`, {
        method: "GET",
      })
      .then((response) =>  response.json())
      .then((data) => {
        console.log(data)
        setData(data)
      });
    },[])
    
    return (
    <div>
    <MDBTable className="table" align='middle' style={{border:'inset'}}>
        <MDBTableHead>
          <tr>
          <th scope='col'>id</th>
          <th scope='col'>Name</th>
          <th scope='col'>Description</th>
          <th scope='col'>Price</th>
          <th scope='col'>Creation Date</th>
          <th scope='col'>Action</th>
          </tr>
        </MDBTableHead>
    
        <MDBTableBody>
          {data.map((data) => (
            <tr key={data._id}>
              <td>{data._id}</td>
              <td>{data.username}</td>
              <td>{data.password}</td>
              <td>{data.email}</td>
              {/* <td>{data.createdAt}</td> */}
              <td><MDBBtn>Edit</MDBBtn></td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
    )   
}

export default Testing