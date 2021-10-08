import React from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <form className="login100-form validate-form flex-sb flex-w">
      <span className="login100-form-title mb-3">Chat - Register</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="text"
          name="name"
          placeholder="Name"
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-end">
          <Link to="/auth/login" className="txt1">
            Already have an account?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button className="login100-form-btn">Create an account</button>
      </div>
    </form>
  );
};
