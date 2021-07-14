import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  authenticated: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // const isLoggedIn = AuthService.isLoggedIn();
        if (authenticated) {
          return children;
        }
        return (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
