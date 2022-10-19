function CreateHolidayForm() {
 
 
    const handleSubmit = (event) => { // handle submit event
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target));
  
      fetch("/api/createholiday", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
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
      <form method="post" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Login</legend>
          <label>
            Name:
            <input name="name" required />
          </label>
          <br />
          <label>
            Celebrated:
            <input name="celebrated" type="checkbox" />
          </label>
          <br />
          <label>
            Likes:
            <input name="likes" type="number" />
          </label>
          <br />
          <label>
            Description:
            <textarea></textarea>
          </label>
          <br />
          <label>
            Country:{" "}
            <select name="pets" id="pet-select">
              <option value="">--Please choose an option--</option>
              <option value="Country1">Country1</option>
              <option value="Country2">Country2</option>
              <option value="Country3">Country3</option>
              <option value="Country4">Country4</option>
              <option value="Country5">Country5</option>
              <option value="Country6">Country6</option>
            </select>
          </label>
          <br />
          <button>Create Holiday</button>
        </fieldset>
      </form>
    );
  }
    
  export default CreateHolidayForm;
  