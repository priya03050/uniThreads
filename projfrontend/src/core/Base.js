import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-2">
        <p><span>If you got any questions, feel free to reach out! </span> 
        <a href="mailto:jainendradwivedi@hotmail.com" target="_blank" class="btn btn-outline-warning">Contact Us</a>
        </p>
      </div>
      <div className="container">
        <span className="text-muted">
          Developed by <span className="text-white">Jainendra Dwivedi</span>
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
