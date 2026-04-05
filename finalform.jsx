import React, { useState } from "react";

function FinalForm() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    participation: "",
    sessions: [],
    notes: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(JSON.stringify(form, null, 2));
    alert("React form submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        placeholder="Name"
        onChange={(e)=>setForm({...form, name:e.target.value})}
      />

      <input
        placeholder="Email"
        onChange={(e)=>setForm({...form, email:e.target.value})}
      />

      <select
        onChange={(e)=>setForm({...form, participation:e.target.value})}
      >
        <option value="">Select</option>
        <option>In-Person</option>
        <option>Virtual</option>
        <option>VIP</option>
      </select>

      <button type="submit">Submit</button>

    </form>
  );
}

export default FinalForm;
