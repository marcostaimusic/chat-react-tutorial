import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { auth, validateToken } = useContext(AuthContext);

  // console.log(auth);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  if (auth.checking) {
    return <p>Please wait...</p>;
  }

  return (
    <Router>
      <div>
        <Switch>
          {/* <Route path="/auth" component={AuthRouter} /> */}
          <PublicRoute
            isAuthenticated={auth.logged}
            path="/auth"
            component={AuthRouter}
          />

          <PrivateRoute
            isAuthenticated={auth.logged}
            exact
            path="/"
            component={ChatPage}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
