import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Api.css";

// Components
import Header from "./Header/Header";

export default function Api() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [user,setUser] = useState("")
  //const [token,setToken] = useState("")

  const go = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const req = await axios.get(
        `http://localhost:1338/logs/${localStorage.getItem("userid")}`
      );
      
      return req.data;
    };
    getData().then((data) => {
    console.log(data)
    })
  }, []);

  useEffect(() => {
    setLoad(false)
    const getData = async () => {
      const req = await axios.get(
        `http://localhost:1337/postits/${localStorage.getItem("userid")}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      //console.log(req.data.username)
      return req.data;
    };
    getData().then((data) => {
      
      if (data.err) {
        go("/");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Authentification error !",
        });
      } else {setData(data.data);setUser(data.username);}
    });

    setLoad(true)
    // eslint-disable-next-line
  }, [load]);

  const Add = async (value) => {
    await axios.post(
      "http://localhost:1337/postit/add",
      {
        postit: value,
        userId: localStorage.getItem("userid"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setLoad(false);
  };

  const Delete = async () => {
    await axios.delete(
      `http://localhost:1337/allpostits/${localStorage.getItem("userid")}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setLoad(false);
  };
  let empty = "";
  if (data.length === 0) {
    empty = (
      <img
      src={require("./assets/images/404.png")}
      width={300}
      style={{marginTop:"20px"}}
      alt="No Post it found !"
    />
      );
  }
  //console.log(data);

  return (
    <>
      <Header username={user} />
      <div
        style={{
          textAlign: "center",
          width: "80%",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <img
          className="graphiti"
          src={require("./assets/images/postits.png")}
          width={300}
          alt="Post it guy"
        />
        <div className="flex-actions">
          <button
            onClick={async () => {
              Swal.fire({
                title: "Enter your Post it",
                input: "textarea",
                inputValue: "",
                showCancelButton: true,
                inputAttributes: {
                  maxlength: 100,
                },
                inputValidator: (value) => {
                  if (!value) {
                    return "You need to write something!";
                  }
                  if (value) {
                    //console.log(value);
                    Add(value);
                  }
                },
              });
            }}
            className="w3-button w3-blue w3-border w3-border-blue w3-round-large"
          >
            Add
          </button>
          &nbsp;&nbsp;
          <button
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  Delete();
                  Swal.fire(
                    "Deleted!",
                    "Your POSTITS has been deleted.",
                    "success"
                  );
                }
              });
            }}
            className="w3-button w3-red w3-border w3-border-red w3-round-large"
          >
            Clear All
          </button>
        </div>

        <div className="w3-row">
          {!load && <div style={{marginTop:"30px"}} id="loader"></div>}

          {load && (
            <>
              {data.map((postit) => {
                return (
                  <>
                    <div className="w3-third">
                      <div className="tile">
                        <div className="tile-content">
                          <pre>{postit.postit}</pre>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )}

          {empty}
        </div>
      </div>
    </>
  );
}
