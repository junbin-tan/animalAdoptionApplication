import React, { useEffect, useState } from "react";
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
import "./registerPage.css";
import Api from "../../helpers/Api";

const RegisterPage = () => {
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
      data.residentialType = data.residentialType['name']; //extract out residential type value (HDB, LANDED, CONDO)
      console.log(data);
      Api.createMember(data).then((data) => setShowMessage(true));
    //   setShowMessage(true);

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
              className="pi pi-check-circle"
              style={{ fontSize: "5rem", color: "var(--green-500)" }}
            ></i>
            <h5>Registration Successful!</h5>
            <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
              Your account is registered under name <b>{formData.name}</b> ;
              it'll be valid next 30 days without activation. Please check{" "}
              <b>{formData.email}</b> for activation instructions.
            </p>
          </div>
        </Dialog>
        <div className="flex justify-content-center">
          <div className="card">
            <h5 className="text-center">Register</h5>
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
