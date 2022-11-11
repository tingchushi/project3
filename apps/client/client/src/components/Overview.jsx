import React from 'react'
import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Profile from './Profile';
import { MDBBtn } from 'mdb-react-ui-kit';

const Overview = () => {
  const [ data, setData ] = useState([]);

  useEffect(()=>{
    const info = JSON.parse(localStorage.getItem('token'));
    const id = info.token;
    
    fetch(`http://localhost:3000/api/cart/all`, {
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

  const sum = data?.reduce((accumulator, object) => {
    return accumulator + object.itemId.price;
  }, 0);
  
  // console.log(sum);
  
  let counter = []
  
  data.forEach(function(obj) {
      var key = JSON.stringify(obj.itemId)
      counter[key] = (counter[key] || 0) + 1
  })
  
  
  // const title = (Object.keys(counter))
  
  // console.log(Object.keys(counter))
  // console.log(Object.values(counter))
  const value = Object.values(counter);
  
  let uId = [];
  let iId = []
  
  data?.forEach(function(value, index) {
    uId[index] = value.userId;
    iId[index] = value.itemId.name;
  })
  
  // console.log(uId);
  // console.log(iId);
  
  const counts = [];
  iId.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
  console.log(counts)
  console.log(Object.keys(counts))
  
  let uniqueChars = [...new Set(iId)];
  
  console.log(uniqueChars);
  
  const country = (value, uniqueChars) => value.map((x, i) => {
    return (
      <li className="list-group-item" key={i}>
        {[x + "ea", " x " + uniqueChars[i]]}<br />
      </li> 
      
  )})
  
  return (
    <>
<Profile />
<br /> 
       <br />
      <MDBBtn style={{float: 'left'}} href="/dashboard">Back to Dashboard</MDBBtn>
       <br />
    <br />
<Plot
        data={[
          {
            x: uniqueChars,
            y: value,
            type: 'bar',
            mode: 'bar',
            marker: {color: 'red'},
          }
          // {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 960, height: 540, title: 'Overview'} }
      />
      <Plot
        data={[
          {
            values: value,
            labels: uniqueChars,
            type: 'pie'
          }
          // {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
          
          layout = {{height: 1024, width: 768 }}
      />
  </>
  )
}

export default Overview
