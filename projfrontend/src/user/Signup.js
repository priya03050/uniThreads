import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  // using states in react
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  // destructuring values for convenience
  const { name, email, password, error, success } = values;

  // setting state values according to event
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // on submit talk to backend
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }) // use api request to backend that we created in auth-helper-index.js
      .then((data) => {  // response from backend request
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          // resetting states
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  // signup form method
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group m-2">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group m-2">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group m-2">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
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
            
            </div>
            
          </form>
        </div>
      </div>
    );
  };

  // pop up mssgs

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please 
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

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

  // return the component
  return (
    <Base title="Sign Up Page" description="Unlock Your Campus Experience with Us!">
      {errorMessage()}
      {successMessage()}  
      {signUpForm()}
      {/* <p className="text-light text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signup;
