import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAutheticated } from "../auth/helper";

const Signin = () => {

  // setting states
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });

  // deconstructing values
  const { email, password, error, loading, didRedirect } = values;
  // is authenticated or not
  const { user } = isAutheticated();

   // setting state values according to event
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // on submit talk to backend
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }) //  sign in backend call
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };


// redirection according to role(admin or simple user)
  const performRedirect = () => {
    if (didRedirect) {
      if (user && (user.role === 1)) {
        return <Redirect to="/admin/dashboard"/>;
      } 
      else{
        return <Redirect to="/cart"/>;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };


  // loading message popup
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  // error message 
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group m-2">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>

            <div className="form-group m-2">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <div className="form-group m-2 text-center">
            <button onClick={onSubmit} className="btn btn-success rounded">
              Submit
            </button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br> 
            <br></br>
            <br></br>
            <br></br>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="Connect. Engage. Access Your Club World!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">Want to sell your Club's Merch? Contact Developer for Admin Credentials.</p>
    </Base>
  );
};

export default Signin;
