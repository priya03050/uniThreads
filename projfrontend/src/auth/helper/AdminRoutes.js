import React from "react";
import { Route, Redirect} from "react-router-dom";
import { isAutheticated } from "./index";



// using it from react router dom - redirect(auth) documentation
const  AdminRoute= ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAutheticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default AdminRoute;