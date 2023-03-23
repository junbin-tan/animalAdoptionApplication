import React, { useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import Userfront from "@userfront/core";
import "./loginPage.css";
import Auth from "../../helpers/Auth";
// Initialize Userfront Core JS
Userfront.init("5nx5q8vb");

const LoginPage = () => {
  // redirect user to dashboard page if user is already logged in
  if (Auth.isAdmin(Auth.getUser())) {
    Auth.redirectIfLoggedIn("/");
  }

  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      if (!data.password) {
        errors.password = "Password is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      console.log(data);

      // call Userfront library auth here
      Userfront.login({
        method: "password",
        emailOrUsername: data.email,
        password: data.password,
        redirect: false,
        // redirect: "/",
      })
        .then((response) => {
          if (response.message === "OK" && response.tokens) {
            console.log(Auth.getUser().data.role);
            if (Auth.isAdmin(Auth.getUser())) {
              Auth.redirectIfLoggedIn("/");
            } else {
              data.error = "Unauthorised access!";
              setFormData(data);
              setShowMessage(true);
              Auth.logout();
            }
          }
        })
        .catch((error) => {
          console.log(error.message);
          data.error = error.message;
          setFormData(data);
          setShowMessage(true);
        });

      formik.resetForm();
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };
  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );

  return (
    <>
      <div className="form-demo">
        <Dialog
          visible={showMessage}
          onHide={() => setShowMessage(false)}
          position="top"
          footer={dialogFooter}
          showHeader={false}
          breakpoints={{ "960px": "80vw" }}
          style={{ width: "30vw" }}
        >
          <div className="flex align-items-center flex-column pt-6 px-3">
            <i
              className="pi pi-times"
              style={{ fontSize: "5rem", color: "var(--red-500)" }}
            ></i>
            <h5>Login Failed!</h5>
            <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
              <b>{formData.error}</b>
            </p>
          </div>
        </Dialog>
        <div className="flex justify-content-center">
          <div className="card">
            <h5 className="text-center">Login</h5>
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              {/* Email textbox */}
              <div className="field">
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-envelope" />
                  <InputText
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("email"),
                    })}
                  />
                  <label
                    htmlFor="email"
                    className={classNames({
                      "p-error": isFormFieldValid("email"),
                    })}
                  >
                    Email*
                  </label>
                </span>
                {getFormErrorMessage("email")}
              </div>

              {/* Password textbox */}
              <div className="field">
                <span className="p-float-label">
                  <Password
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    toggleMask
                    className={classNames({
                      "p-invalid": isFormFieldValid("password"),
                    })}
                  />
                  <label
                    htmlFor="password"
                    className={classNames({
                      "p-error": isFormFieldValid("password"),
                    })}
                  >
                    Password*
                  </label>
                </span>
                {getFormErrorMessage("password")}
              </div>
              {/* Submit button */}
              <Button type="submit" label="Login" className="mt-2" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
