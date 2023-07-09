import { API } from "../../backend";

// Signup Request
export const signup = user => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// Signin Request
export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// 'authenticate' middleware (stores token in user browser)
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

// // Signout Request
export const signout = next => {
  if (typeof window !== "undefined") { 
    localStorage.removeItem("jwt"); // signout from frontend
    next();

    return fetch(`${API}/signout`, { // signout from backend
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
  }
};

export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;  // if not authenticated i.e. no access to window
  }
  if (localStorage.getItem("jwt")) {
    //  return jwt value, in frontend we check whether token is exactly same as user we are looking up for, then fire it up as true
    return JSON.parse(localStorage.getItem("jwt")); 
  } else {
    return false;
  }
};
