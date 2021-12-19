import "./login.scss";
import { useContext, useState } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
import "./login.scss";

// We could also have a Common 'Parent' User Login/Register Page with one background, and Register.jsx and Login.jsx files within that folder.

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="login">
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
        <form>
            <h1>Sign In</h1>
            
            <input
            type="email"
            value={email}
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)} />
            
            <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />

            <button className="loginButton" onClick={handleLogin}>
              Sign In
            </button>
            <span>
              New to Netflix?
            <Link to="/register" >
            <button className="registerButton">Register</button>
          </Link>
            </span>
          </form>
      </div>
    </div>
  );
}
