import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "react-google-login";

import Swal from "sweetalert2";

export const LoginPage = () => {
  const { login, responseSuccessGoogle } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberme: false,
  });

  useEffect(() => {
    const rememberMeEmail = localStorage.getItem("email");
    if (rememberMeEmail) {
      setForm((form) => ({
        ...form,
        rememberme: true,
        email: rememberMeEmail,
      }));
    }
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const toggleCheck = () => {
    setForm({
      ...form,
      rememberme: !form.rememberme,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (form.rememberme) {
      localStorage.setItem("email", form.email);
    } else {
      localStorage.removeItem("email");
    }

    const { email, password } = form;
    const ok = await login(email, password);

    if (!ok) {
      Swal.fire("Error", "Check your email and password", "error");
    }
  };

  const checkEmptyForm = () => {
    return form.email.length > 0 && form.password.length > 0 ? true : false;
  };

  const responseFailureGoogle = (response) => {
    console.log(response.profileObj);
  };

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={onSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Login</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col" onClick={() => toggleCheck()}>
          <input
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberme"
            checked={form.rememberme}
            readOnly
          />
          <label className="label-checkbox100">Remember me</label>
        </div>

        <div className="col text-end">
          <Link to="/auth/register" className="txt1">
            Create an account
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          type="submit"
          className="login100-form-btn"
          disabled={!checkEmptyForm()}
        >
          Sign in
        </button>
        <div>
          <GoogleLogin
            clientId="516113137194-lfa4g8g7ladk19t56ol43p597c1tm6t1.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </form>
  );
};
