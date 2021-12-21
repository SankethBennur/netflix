import axios from "../../axios.js";
import { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.scss";


export default function Register() {
  // // useState Hooks for Email and Password Setters 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();
  
  async function handleRegister(e){
    e.preventDefault();
    
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      };
      const { data } = await axios.post("auth/register", {
        email, username, password
      }, config);
      
    } catch (err) {}
    // alert({ data });
    history.push("/login");
  };
  
  
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />

<Link to="/login" >
            <button className="loginButton">Sign In</button>
        </Link>
          
        </div>
      </div>
      
      <div className="container">
        
        <h1>Unlimited movies, TV shows, and more.</h1>
        
        <h2>Watch anywhere. Cancel anytime.</h2>
        
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        
        {/* SUPER IMPORTANT */}
        {/* handleEmail will set email with String Object fetched from emailRef, making it not null */}
        {/* when email is not null (empty, by default ""), email is to be handled. */}

          <form className="input" onSubmit={handleRegister}>
                <input className="field"
                type="email"
                value={email}
                placeholder="Email Address"
                // ref={emailRef}
                onChange={(e) => setEmail(e.target.value)} />

                <input className="field"
                type="username"
                value={username}
                placeholder="Username"
                // ref={usernameRef}
                onChange={(e) => setUsername(e.target.value)} />
            
               <input className="field"
               type="password"
               value={password}
               placeholder="Password"
              //  ref={passwordRef}
               onChange={(e) => setPassword(e.target.value)} />
               
               {/* <button className="registerButton" onClick={console.log(`${email}, ${password}`)}>Start</button> */}
               <input className="registerButton" type="submit" value="Submit"></input>

          
          </form>

        {/* {!email ? (
          <div className="input">
          
            <input type="email"
            // value={email}
            placeholder="Email Address"
            ref={emailRef} />

            <input
            type="username"
            // value={username}
            placeholder="Username"
            ref={usernameRef} />
          
            <button className="registerButton" onClick={handleEmail}>
              Get Started
            </button>
          
          </div>
        ) : (
          <form className="input">
            
               <input type="password" placeholder="Password" ref={passwordRef} />
               
               <button className="registerButton" onClick={handlePassword}>Start</button>
          
          </form>
        )} */}

        {/* <Link to="/login" >
            <button className="loginButton">Sign In</button>
        </Link> */}
      </div>
    </div>
  );
}
