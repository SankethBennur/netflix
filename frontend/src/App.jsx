import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route exact path="/">
          {user ? <Home type="" /> : <Redirect to="/register" />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
        {(user)
            ? <>
                <Route path="/movies">
                  <Home type="movies" />
                </Route>
                <Route path="/series">
                  <Home type="series" />
                </Route>
                <Route path="/watch">
                  <Watch />
                </Route>
              </>
            : <Redirect to="/" />
        }
      </Switch>
    </BrowserRouter>
  );
};

export default App;
