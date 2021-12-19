import "./app.scss";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Watch from "./Pages/Watch/Watch";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";


const App = () => {
  // before going to Home, Movies or TV Shows page, verify if user exists.
  // if user is not logged in, false or does not exist, go to register/login page.
  
  const { user } = useContext(AuthContext);

  return(
    <div>
      {/* Primarily, App.js only contains all possible Routes of the Web */}
      <Router>
        <Switch>
          
          <Route path="/register"> {!user ? <Register /> : <Redirect to="/" />} </Route>
          
          <Route path="/login"> {!user ? <Login /> : <Redirect to="/" />} </Route>
          
          {/* Movies and TV Shows pages are pretty much like Home Page. */}
          {/* They are just like a filtered version of the Home Page. */}
          {/* <Route exact path="/"> {user ? <Home /> : <Redirect to="/register" />} </Route> */}
          <Route exact path="/"> <Home /> </Route>

          <div>
            {/* Routes must not be confused with Link */}
            {/* They show all possible routes in the whole web application */}
            <Route path="/movies">
            {!user ? <Register /> : <Home type="movies" />}
            </Route>
            
            <Route path="/series"> 
            {!user ? <Register /> : <Home type="series" />}
            </Route>
            
            <Route path="/watch"> 
            {!user ? <Register /> : <Watch />}
            </Route>
          </div>

        </Switch>
      </Router>
    </div>
  );
};

export default App;