import { useState } from 'react';
import { useNavigate } from "react-router-dom"

function LoginForm() {
    const [error, setError] = useState(" ");
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = Object.fromEntries(new FormData(event.target));
  
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        // .then((response) => response.json())
        // .then((data) => {
        //   console.log(data);
        //   if (data.msg === "Login route") {
        //     navigate("/welcome");
        //   }
        // });

        .then((response) => {
            if (response.ok) {
              navigate("/welcome");
            } else {
              setError("Oops");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          });
    };
    
  
    return (
        <>
      <form method="post" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Login</legend>
          <label>
            Username:
            <input name="username" />
          </label>
          <label>
            Password:
            <input name="password" />
          </label>
          <button>Login</button>
        </fieldset>
      </form>
      {error}
        </>
    );
  }
  
  export default LoginForm;
  