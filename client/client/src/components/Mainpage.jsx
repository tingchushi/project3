import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function Mainpage (){
const [data, setData] = useState([])

    useEffect(()=>{
      fetch("http://localhost:3000/api/item", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      })
      .then((response) =>  response.json())
      .then((data) => {
        setData(data)
      });
    },[])


      console.log(data)
    
    return (
        <div>
            <h1>Item List</h1>
            <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>id</th>
          <th scope='col'>Name</th>
          <th scope='col'>Description</th>
          <th scope='col'>Price</th>
          <th scope='col'>Creation Date</th>
          <th scope='col'></th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <div>
          {data.map((data,i) => <tr>
            <td key={i}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data._id[i]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>)} 
        </div>      
        <div>
          {data.map((data,i) => <tr>
            <td key={i}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>)} 
        </div>      
      </MDBTableBody>
      
    </MDBTable>
        </div>
    )
}

export default Mainpage

{/* // {data.name}
//               {data.description}
//               {data.price}
//               {/* {data.expiryDate} */}
{/* //               {data.createdAt}</div>)} */} 

{/* <td>
{data.map((data,i) => <div key={i}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data._id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>)} */}

{/* </td>
<td>
{data.map((data,i) => <div key={i}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>)}
</td>
<td>
{data.map((data,i) => <div key={i}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.description}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>)}
</td>
<td>
{data.map((data,i) => <div key={i}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.price}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>)}
</td>
<td>
{data.map((data,i) => <div key={i}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.createdAt}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>)}
</td> */}