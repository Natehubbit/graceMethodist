import { FC, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ReactComponent as Loader } from "./assets/images/loader.svg";
import PrivateRoute from "./components/PrivateRoute";
import Add from "./pages/Add";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AuthService from "./services/AuthService";

const App: FC = () => {
  const [authenticated, setAuthenticated] = useState<
    boolean | undefined
  >(undefined);
  useEffect(() => {
    AuthService.authStateListener(setAuthenticated);
  }, []);
  if (authenticated === undefined)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-52 w-52" />
      </div>
    );
  return (
    <div>
      <Router>
        <Switch>
          {!authenticated && (
            <Route exact path="/" component={Login} />
          )}
          <PrivateRoute
            authenticated={authenticated}
            exact
            path="/dashboard"
          >
            <Home />
          </PrivateRoute>
          <PrivateRoute
            authenticated={authenticated}
            exact
            path="/add"
          >
            <Add />
          </PrivateRoute>
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
