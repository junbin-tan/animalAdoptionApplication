import React, { useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import Userfront from "@userfront/core";
import "./loginPage.css";
import Api from "../../helpers/Api";
import { useNavigate } from "react-router-dom";
import Auth from "../../helpers/Auth";
// Initialize Userfront Core JS
Userfront.init("5nx5q8vb");

const LoginPage = () => {
  // redirect user to dashboard page if user is already logged in
  Auth.redirectIfLoggedIn("/");

  // redirect to register page if user clicks on register button on login page
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/register`;
    navigate(path);
  };

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

      Api.login(data)
        .then((response) => {
          const responseJson = response.json();
          responseJson.then((responseJsonData) => {
            if (responseJsonData.error) {
              setFormData(responseJsonData);
              setShowMessage(true);
            } else {
              // call Userfront library auth here
              Userfront.login({
                method: "password",
                emailOrUsername: data.email,
                password: data.password,
                redirect: "/Homepage",
              }).catch((error) => {
                console.log(error.message);
                data.error = error.message;
                setFormData(data);
                setShowMessage(true);
              });
            }
          });
        })
        .catch((error) => {
          // this error here caught when java server is not on or null pointer exception :(
          console.log(error);
          data.error =
            "Our backend server is facing issues right now. Please try again later.";
          setFormData(data);
          setShowMessage(true);
        });

      // Userfront.login({
      //   method: "password",
      //   emailOrUsername: data.email,
      //   password: data.password,
      //   redirect: "/"
      // })
      //   .then((response) => {
      //     Api.login(data).then((response) => {
      //       const jsonData = response.json();
      //       jsonData.then((data) => {
      //         if (data.error) {
      //           setFormData(data);
      //           setShowMessage(true);
      //         } else {
      //           // redirect to home page
      //         }
      //       });
      //     });
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //     data.error = error.message;
      //     setFormData(data);
      //     setShowMessage(true);
      //   });

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
      <div className="form-demo" style={{padding: '20px'}}>
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
        <h2 className="text-center">Login</h2>
          <div className="card">
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
            {/* Register button  */}
            <Button label="Register" className="mt-2" onClick={routeChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
