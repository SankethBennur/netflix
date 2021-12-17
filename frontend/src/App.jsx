import "./app.scss";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Watch from "./Pages/Watch/Watch";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
// import { AuthContext } from "./authContext/AuthContext";


const App = () => {
  // before going to Home, Movies or TV Shows page, verify if user exists.
  // if user is not logged in, false or does not exist, go to register/login page.
  
  const user = true;

  return(
    <div>
      <Router>
        <Switch>
          
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/register" />}
            {/* <Home /> */}
          </Route>

          <Route path="/register">
            {!user ? <Register /> : <Redirect to="/" />}
            {/* <Register /> */}
          </Route>
          
          <Route path="/login">
            {!user ? <Login /> : <Redirect to="/" />}
            <Login />
          </Route>
          
          {user && (   // similar to if(user){}
            <div>
              <Route path="/movies">
                <Home type="movies" />
              </Route>
              
              <Route path="/series">
                <Home type="series" />
              </Route>
              <Route path="/watch">
                <Watch />
              </Route>
            </div>
          )}

        </Switch>
      </Router>
    </div>
  );
};

export default App;