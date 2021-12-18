import axios from "../../axios.js";
import { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.scss";


export default function Register() {
  // useState Hooks for Email and Password Setters 
  const [email, setEmail] = useState("");  // Important to make empty string, to validate empty object.
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  // useRef Hooks for Email and Password, instead of document.getElementById in JS.
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleEmail = () => {
    setEmail(emailRef.current.value);  // setEmail function is taking in emailRef as parameter
  };

  async function handlePassword(e){
    e.preventDefault();
    setPassword(passwordRef.current.value);  // passwordRef's value (from website) is fetched and used to set 'password'
    setUsername(usernameRef.current.value);
    try {
      await axios.post("auth/register", { email, username, password });
      history.push("/login");
    } catch (err) {}
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
          
        </div>
      </div>
      
      <div className="container">
        
        <h1>Unlimited movies, TV shows, and more.</h1>
        
        <h2>Watch anywhere. Cancel anytime.</h2>
        
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        
        {/* SUPER IMPORTANT */}
        {/* handleEmail will set email with String Object fetched from emailRef, making it not null */}
        {/* when email is not null (empty, by default ""), email is to be handled. */}

        {!email ? (
          <div className="input">
          
            <input type="email" placeholder="Email Address" ref={emailRef} />
          
            <button className="registerButton" onClick={handleEmail}>
              Get Started
            </button>
          
          </div>
        ) : (
          <form className="input">
               <input type="username" placeholder="username" ref={usernameRef} />
            
               <input type="password" placeholder="Password" ref={passwordRef} />
               
               <button className="registerButton" onClick={handlePassword}>Start</button>
          
          </form>
        )}
        <Link to="/login" >
            <button className="loginButton">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
