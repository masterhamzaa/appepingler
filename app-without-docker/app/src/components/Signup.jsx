import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
export default function Signup() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const go = useNavigate();

  function onSubmit(e) {

    e.preventDefault();
    const transfert = async () => {
      const req = await axios.post("http://server:1337/register", data);
      return req.data;
    };

    transfert().then((res) => {
      if (res.success) {
        Swal.fire("Signup", "You are signup successfuly !", "success");
        go("/");
      }
      if (res.exist) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User already exist try another email !",
        });
      }

      
    });
  }

  return (
    <div className="container">
      <div className="w3-container w3-pale-green w3-round h sh">
        <h4
          className="w3-left"
          style={{ textShadow: "1.4px 1px 10 white", paddingTop: 6 }}
        >
          P O S T I T
        </h4>
        <div className="w3-right" style={{ marginTop: "14px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button
              className="w3-button w3-round w3-white w3-padding-3"
              style={{ marginBottom: 12 }}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
      <br />
      <br />
      <div
        className="w3-container"
        style={{ width: "60%", padding: "10px", margin: "0 auto" }}
      >
        <form className="w3-container" method="post" onSubmit={onSubmit}>
          
          <label>Name</label>
          <input
            className="w3-input"
            type="text"
            name="fullName"
            id="fullName"
            autoFocus
            onChange={(e) => {
              setData({ ...data, [e.target.name]: e.target.value });
            }}
            required
          />

          <label>Email</label>
          <input
            className="w3-input"
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setData({ ...data, [e.target.name]: e.target.value });
            }}
            required
          />

          <label>Password</label>
          <input
            className="w3-input"
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setData({ ...data, [e.target.name]: e.target.value });
            }}
            required
            minLength={8}
          />
          <br />
          <button style={{padding:"5px 30px 5px 30px",borderRadius:"8px"}} className="w3-btn w3-blue" type="submit">
            Signup
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}
