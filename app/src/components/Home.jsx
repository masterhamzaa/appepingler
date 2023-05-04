import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Home.css";


export default function Home() {
const go = useNavigate();


    /* useEffect(()=>{
        const getData = async ()=> {
            const req = await axios.get("http://localhost:1337/home",{
                headers : {
                    "Authorization" : localStorage.getItem("token")
                }
            });
            return req.data;
        };
        getData().then((data) => {
            if(data.err) go("/")
        } )
    },[]) */


  return (
    <><div className="container">
    <div className="w3-container w3-pale-green w3-round h">
      <h4
        className="w3-left"
        style={{ textShadow: "1.4px 1px 10 white", paddingTop: 6 }}
      >
        C H A T
      </h4>
      <div className="w3-right" style={{ marginTop: "14px" }}>
      
          <button
            className="w3-button w3-round w3-white w3-padding-3"
            style={{ marginBottom: 12 }}
            onClick={()=>{
                localStorage.setItem("token","");
                go("/")
            }}
          >
             Log out
          </button>
      
      </div>
</div>
</div>
        <div
          className="w3-container flex"
          style={{ width: "60%", padding: "10px", margin: "0 auto" }}
        >
            <img src={require("./assets/images/homeguy.png")} alt='gamer guy' style={{borderRadius:"20px",width:"280px",height:"280px"}}/>
            <button class="w3-button w3-purple">Create room</button>
            <button class="w3-button w3-yellow">Join room</button>

        </div>
    </>
  )
}
