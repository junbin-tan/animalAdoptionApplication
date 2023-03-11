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
import "./donationPage.css";
import Api from "../../helpers/Api";
import logo from "./qrCode.png";

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
      residentialType: "",
      testimonial: "",
      accept: false,
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
      delete data.accept; 
      data.residentialType = data.residentialType['name']; //extract out residential type value (HDB, LANDED, CONDO)
      console.log(data);
      Api.createMember(data).then((data) => setShowMessage(true));

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
      <div style={{ margin: "5px" }}>
        <img src={logo} alt="qrCode" style={{ width: "300px" }} />
      </div>
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
            <h5>Donation Successful!</h5>
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

              {/* Testimonial textbox */}
              <div className="field">
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-envelope" />
                  <InputText
                    id="testimonial"
                    name="testimonial"
                    value={formik.values.testimonial}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("testimonial"),
                    })}
                  />
                  <label
                    htmlFor="testimonial"
                    className={classNames({
                      "p-error": isFormFieldValid("testimonial"),
                    })}
                  >
                    Leave us a comment!*
                  </label>
                </span>
                {getFormErrorMessage("testimonial")}
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
                  I Acknowlegde that donations are non refundable*
                </label>
              </div>

              {/* Submit button */}
              <Button type="submit" label="Procede to Donate!" className="mt-2" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;