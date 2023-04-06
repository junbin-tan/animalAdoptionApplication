import React, { useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import Userfront from "@userfront/core";
import "./registerPage.css";
import Api from "../../helpers/Api";
import Auth from "../../helpers/Auth";

// Initialize Userfront Core JS
Userfront.init("5nx5q8vb");

const RegisterPage = () => {
  // redirect user to dashboard page if user is already logged in
  Auth.redirectIfLoggedIn("/");

  const residentialTypes = [
    { name: "HDB", code: "HDB" },
    { name: "CONDO", code: "CONDO" },
    { name: "LANDED", code: "LANDED" },
  ];
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      openToFoster: false,
      openToAdopt: false,
      location: "",
      occupation: "",
      residentialType: "",
      accountStatus: "UNVERIFIED",
      accept: false,
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }

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

      if (!data.phoneNumber) {
        errors.phoneNumber = "Phone number is required.";
      }

      if (!data.location) {
        errors.location = "Location is required";
      }

      if (!data.occupation) {
        errors.occupation = "Occupation is required";
      }

      if (!data.residentialType) {
        errors.residentialType = "Residential Type is required.";
      }

      if (!data.accept) {
        errors.accept = "You need to agree to the terms and conditions.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      delete data.accept; // delete accept json property because we don't need to submit it to backend restful
      data.residentialType = data.residentialType["name"]; //extract out residential type value (HDB, LANDED, CONDO)
      console.log(data);

      Api.createMember(data)
        .then((response) => {
          if (response.ok) {
            // response ok code 200 from java backend
            const responseJson = response.json();
            responseJson.then((responseJsonData) => {
              Userfront.signup({
                method: "password",
                email: data.email,
                password: data.password,
                redirect: "/",
                data: responseJsonData, // store member obj data from java into userfront auth library
              })
                .then((response) => {
                  setShowMessage(true);
                })
                .catch((error) => {
                  data.error = error.message;
                  setFormData(data);
                  setShowMessage(true);
                });
            });
          } else {
            const responseJson = response.json();
            responseJson.then((responseJsonData) => {
              if (responseJsonData.error) {
                setFormData(responseJsonData);
                setShowMessage(true);
              }
            });
          }
        })
        .catch((error) => {
          // this error here caught when java server is not on or null pointer exception :(
          console.log(error);
          data.error =
            "Our backend server is facing issues right now. Please try again later.";
          setFormData(data);
          setShowMessage(true);
        });

      // Userfront.signup({
      //   method: "password",
      //   email: data.email,
      //   password: data.password,
      //   redirect: "/",
      //   data: data,
      // })
      //   .then((response) => {
      //     Api.createMember(data).then((response) => {
      //       // TODO: redirect to home page
      //       setShowMessage(true);
      //     });
      //   })
      //   .catch((response) => {
      //     const jsonData = response.json();
      //     jsonData.then((data) => {
      //       setFormData(data);
      //       setShowMessage(true);
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
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
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
            {/* when got error, show error message for register */}
            {formData.error && (
              <>
                <i
                  className="pi pi-times"
                  style={{ fontSize: "5rem", color: "var(--red-500)" }}
                ></i>

                <h5>Registration Error!</h5>
                <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                  <b>{formData.error}</b>
                </p>
              </>
            )}
            {/* when no error, show success register */}
            {!formData.error && (
              <>
                <i
                  className="pi pi-check-circle"
                  style={{ fontSize: "5rem", color: "var(--green-500)" }}
                ></i>

                <h5>Registration Successful!</h5>
                <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                  Your account is registered under name <b>{formData.name}</b> ;
                  it'll be valid next 30 days without activation. Please check{" "}
                  <b>{formData.email}</b> for activation instructions.
                </p>
              </>
            )}
          </div>
        </Dialog>
        <div className="flex justify-content-center">
          <h2 className="text-center">Registration</h2>
          <div className="card">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              {/* Name textbox */}
              <div className="field">
                <span className="p-float-label">
                  <InputText
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("name"),
                    })}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({
                      "p-error": isFormFieldValid("name"),
                    })}
                  >
                    Name*
                  </label>
                </span>
                {getFormErrorMessage("name")}
              </div>

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
                    header={passwordHeader}
                    footer={passwordFooter}
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

              {/* Phone number textbox */}
              <div className="field">
                <span className="p-float-label">
                  <InputMask
                    id="phoneNumber"
                    name="phoneNumber"
                    mask="99999999"
                    placeholder="91234567"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("phoneNumber"),
                    })}
                  ></InputMask>
                  <label
                    htmlFor="phoneNumber"
                    className={classNames({
                      "p-error": isFormFieldValid("phoneNumber"),
                    })}
                  >
                    Phone*
                  </label>
                </span>
              </div>

              {/* Open to foster checkbox */}
              <div className="field-checkbox">
                <Checkbox
                  inputId="openToFoster"
                  name="openToFoster"
                  checked={formik.values.openToFoster}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("openToFoster"),
                  })}
                />
                <label
                  htmlFor="openToFoster"
                  className={classNames({
                    "p-error": isFormFieldValid("openToFoster"),
                  })}
                  style={{ color: "black" }}
                >
                  I am open to foster*
                </label>
              </div>

              {/* Open to adoption checkbox */}
              <div className="field-checkbox">
                <Checkbox
                  inputId="openToAdopt"
                  name="openToAdopt"
                  checked={formik.values.openToAdopt}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("openToAdopt"),
                  })}
                />
                <label
                  htmlFor="openToAdopt"
                  className={classNames({
                    "p-error": isFormFieldValid("openToAdopt"),
                  })}
                  style={{ color: "black" }}
                >
                  I am open to adopt*
                </label>
              </div>

              {/* Location textbox */}
              <div className="field">
                <span className="p-float-label">
                  <InputText
                    id="location"
                    name="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("location"),
                    })}
                  />
                  <label
                    htmlFor="location"
                    className={classNames({
                      "p-error": isFormFieldValid("location"),
                    })}
                  >
                    Location Address*
                  </label>
                </span>
                {getFormErrorMessage("location")}
              </div>

              {/* Occupation textbox */}
              <div className="field">
                <span className="p-float-label">
                  <InputText
                    id="occupation"
                    name="occupation"
                    value={formik.values.occupation}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("occupation"),
                    })}
                  />
                  <label
                    htmlFor="occupation"
                    className={classNames({
                      "p-error": isFormFieldValid("occupation"),
                    })}
                  >
                    Occupation*
                  </label>
                </span>
                {getFormErrorMessage("occupation")}
              </div>

              {/* Residential Type dropdown list */}
              <div className="field">
                <span className="p-float-label">
                  <Dropdown
                    id="residentialType"
                    name="residentialType"
                    value={formik.values.residentialType}
                    onChange={formik.handleChange}
                    options={residentialTypes}
                    optionLabel="name"
                    className={classNames({
                      "p-invalid": isFormFieldValid("residentialType"),
                    })}
                  />
                  <label
                    htmlFor="residentialType"
                    className={classNames({
                      "p-error": isFormFieldValid("residentialType"),
                    })}
                  >
                    Residential Type
                  </label>
                </span>
              </div>

              {/* Terms and condition checkbox */}
              <div className="field-checkbox">
                <Checkbox
                  inputId="accept"
                  name="accept"
                  checked={formik.values.accept}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("accept"),
                  })}
                />
                <label
                  htmlFor="accept"
                  className={classNames({
                    "p-error": isFormFieldValid("accept"),
                  })}
                  style={{ color: "black" }}
                >
                  I agree to the terms and conditions*
                </label>
              </div>

              {/* Submit button */}
              <Button type="submit" label="Submit" className="mt-2" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
