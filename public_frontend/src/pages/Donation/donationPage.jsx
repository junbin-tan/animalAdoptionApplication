import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import "./donationPage.css";
import Api from "../../helpers/Api";
import logo from "./qrCode.png";
import Auth from "../../helpers/Auth";
import UserContext from "../../helpers/context/UserContext";

const DonationPage = () => {
  // Start: get valid current actual user with data like events created, donations, animal listings created etc

  const { currentActualUser } = useContext(UserContext);

  console.log("Getting current actual user at Donation Page");
  const currentUserDonations = currentActualUser && currentActualUser.donations;
  console.log(currentUserDonations);
  console.log(currentActualUser && currentActualUser);

  // End: get valid current actual user with data like events created, donations, animal listings created etc

  var donationType = [];
  if (Auth.getUser()) {
    donationType = [
      { name: "Anonymous", code: "anonymous" },
      { name: "Open", code: "open" },
    ];
  } else {
    donationType = [{ name: "Anonymous", code: "anonymous" }];
  }

  // var donationType = Auth.getUser() &&  [
  //   { name: "Anonymous", code: "anonymous" },
  //   { name: "Open", code: "open" },
  // ];

  //JSON format that will be parsed
  /*
{
  "name" : "Alwin",
  "email" : "alwinngjw@gmail.com",
  "amount": "1500.0",
  "donationType" : "OPEN",
  "testimonial" : {
      "message" : "This website is good!"
      }
  }
  */
  //Change donationStatus to type
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [toNext, setToNext] = useState(false);

  // get currrent user if authenticated
  const currentUser = Auth.getUser();

  let userFullName = "";
  let userEmail = "";

  if (currentUser) {
    userFullName = currentUser.data.name;
    userEmail = currentUser.email;
  }

  const formik = useFormik({
    initialValues: {
      name: userFullName,
      email: userEmail,
      donationType: "",
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
      if (!data.donationType) {
        errors.donationType = "Donation Type is required.";
      }

      if (!data.accept) {
        errors.accept = "You need to agree to the terms and conditions.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      delete data.accept;
      data.donationType = data.donationType["name"].toUpperCase();
      const test = { message: data.testimonial };
      data.testimonial = test;
      console.log(data);
      Api.createNewDonation(data).then((data) => setShowMessage(true));
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
      <a
        href="https://buy.stripe.com/test_5kA17o4Ji5Ax4CYbII"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          label="Redirect me"
          className="p-button-text"
          autoFocus
          onClick={() => setShowMessage(false)}
        />
      </a>
    </div>
  );

  return (
    <>
      <h2 style={{ textAlign: "center" }}> Donation</h2>
      <div
        style={{
          margin: "5px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <img
          src={logo}
          alt="qrCode"
          style={{
            width: "300px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        />
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
              You will be Redirected to Stripe's payment gateway
            </p>
          </div>
        </Dialog>

        <div className="flex justify-content-center">
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

              {/* Donation Type dropdown list */}
              <div className="field">
                <span className="p-float-label">
                  <Dropdown
                    id="donationType"
                    name="donationType"
                    value={formik.values.donationType}
                    onChange={formik.handleChange}
                    options={donationType}
                    optionLabel="name"
                    className={classNames({
                      "p-invalid": isFormFieldValid("donationType"),
                    })}
                  />
                  <label
                    htmlFor="donationType"
                    className={classNames({
                      "p-error": isFormFieldValid("donationType"),
                    })}
                  >
                    Donation Type
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
                  style={{ color: "black" }}
                >
                  I acknowledged that donations are non refundable*
                </label>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                label="Proceed to Donate!"
                className="mt-2"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationPage;
