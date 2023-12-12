import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useNavigate();

  const header = { "Content-Type": "application/json" };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Click");
    axios
      .post("https://6577541c197926adf62e013a.mockapi.io/crud", {
        name: name,
        email: email,
        header,
      })
      .then(() => {
        history("/read");
      });
  };

  return (
    <>
    <div className="d-flex justify-content-between m-4">
      <h2>Create</h2>
      <Link to="/read">
      <button className="btn btn-primary">Show Data</button>
      </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default Create;
