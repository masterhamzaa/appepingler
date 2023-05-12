import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Swal from 'sweetalert2';


export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const go = useNavigate();

  function onLogin(e) {
    e.preventDefault();
    const transfert = async () => {
      const req = await axios.post("http://localhost:1337/login", data);
      return req.data;
    };

    transfert().then((res) => {

      if(!res.err) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userid",data.email);
        go("/Postits")
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email or Password invalid !',
        })
      }
    });
    
  }

  return (
    <>
      <div className="container">
        <div className="w3-container w3-pale-green w3-round h">
          <h4
            className="w3-left"
            style={{ textShadow: "1.4px 1px 10 white", paddingTop: 6 }}
          >
            P O S T I T
          </h4>
          <div className="w3-right" style={{ marginTop: "14px" }}>
            <Link to="/Signup" style={{ textDecoration: "none" }}>
              <button
                className="w3-button w3-round w3-white w3-padding-3"
                style={{ marginBottom: 12 }}
              >
                Sign Up
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
          <form className="w3-container formControls" method="post" onSubmit={onLogin}>
            <label>Email</label>
            <input
              className="w3-input formControl__input"
              name="email"
              id="email"
              type="email"
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
              }}
 
              required
            />

            <label>Password</label>
            <input
              className="w3-input formControl__input"
              name="password"
              id="password"
              type="password"
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
              }}
              required
            />
            <br />
            <button className="w3-btn w3-blue" formMethod="post" type="submit">
              Login
            </button>
            <br />
          </form>
        </div>
      </div>
    </>
  );
}
