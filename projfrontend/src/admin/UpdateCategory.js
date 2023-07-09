// TODO: update category not working : backend error

import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  // states
  const [values, setValues] = useState({
    name: "",
    error: "",
    formData: "",
    getaRedirect: false,
    loading: false,
    createdCategory: "",
  });

  //destructuring
  const { name, error, formData, getaRedirect, loading, createdCategory } =
    values;

  //user info from backend
  const { user, token } = isAutheticated();

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          formData: new FormData(),
        });
      }
    });
  };
  

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  // to handle change
  const handleChange = name => event => {
    formData.set(name, event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  // onSubmit
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    //backend request fired with ids, token and user's name
    updateCategory(match.params.categoryId, user._id, token, formData).then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            loading: false,
            createdCategory: data.name,
          });
        }
      }
    );
  };

  // success message for created category succesfully
  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdCategory ? "" : "none" }}
    >
      <h4>{createdCategory} updated successfully</h4>
    </div>
  );

  // Warning message for failed  category creation
  // const warningMessage = () => {
  //   if (error) {
  //     return <h4 className="text-success">Failed to create category</h4>;
  //   }
  // };

  // create category form
  const createCategoryForm = () => (
    <form>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Update Categories"
      description="Revamp your club's categories"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
    
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
