import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [data, setData] = useState();
  const [tabledark, setTabledark] = useState("");

  const setToLocalSttorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  function handleDelete(id) {
    axios
      .delete(`https://6577541c197926adf62e013a.mockapi.io/crud/${id}`)
      .then(() => {
        getData();
      });
  }

  function getData() {
    axios
      .get("https://6577541c197926adf62e013a.mockapi.io/crud")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => {
            if (tabledark === "table-dark") setTabledark("");
            else setTabledark("table-dark");
          }}
        />
      </div>
      <div className="d-flex justify-content-between m-4">
        <h2>Read Operation</h2>
        <Link to="/">
          <button className="btn btn-secondary">Create</button>
        </Link>
      </div>
      <table className={`table ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Update</th>
            <th scope="col">Remove</th>
            
          </tr>
        </thead>
        {data?.map((eachData) => {
          return (
            <>
              <tbody>
                <tr>
                  <th scope="row">{eachData.id}</th>
                  <td>{eachData.name}</td>
                  <td>{eachData.email}</td>
                  <td>
                    <Link to="/update">
                      <button
                        className="btn-success"
                        onClick={() =>
                          setToLocalSttorage(
                            eachData.id,
                            eachData.name,
                            eachData.email
                          )
                        }
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(eachData.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
}

export default Read;
