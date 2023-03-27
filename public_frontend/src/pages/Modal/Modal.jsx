import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import Api from "../../helpers/Api";
import { Toast } from "primereact/toast";
import Auth from "../../helpers/Auth";
import UserContext from "../../helpers/context/UserContext";
import "./modal.css";

const Modal = ({ setShowModal, description, animalListing }) => {
  const { currentActualUser } = useContext(UserContext);

  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const toast = useRef(null);


  const sleepArea = [
    { name: "INDOOR", code: "INDOOR" },
    { name: "OUTDOOR", code: "OUTDOOR" },
    { name: "OUTDOOR_SHELTER", code: "OUTDOOR_SHELTER" },
  ];


  // form type(s) will be displayed accordingly
  var formType = [
    { name: "ADOPTION", code: "ADOPTION" },
    { name: "FOSTERING", code: "FOSTERING" },
    { name: "ADOPTION_FOSTERING", code: "ADOPTION_FOSTERING" },
  ];

  if (animalListing.isAdoption && !animalListing.isFostering) {
    formType = [{ name: "ADOPTION", code: "ADOPTION" }];
  } else if (!animalListing.isAdoption && animalListing.isFostering) {
    formType = [{ name: "FOSTERING", code: "FOSTERING" }];
  }

  const m = currentActualUser && {
    memberId: currentActualUser.memberId,
    name: currentActualUser.name,
    email: currentActualUser.email,
    password: currentActualUser.password,
    phoneNumber: currentActualUser.phoneNumber,
    openToFoster: currentActualUser.openToFoster,
    openToAdopt: currentActualUser.openToAdopt,
    location: currentActualUser.location,
    occupation: currentActualUser.occupation,
    residentialType: currentActualUser.residentialType,
    accountStatus: currentActualUser.accountStatus,
    reviewsReceived: currentActualUser.reviewsReceived,
    eventListings: currentActualUser.eventListings,
    eventRegistrations: currentActualUser.eventRegistrations,
    animalListings: currentActualUser.animalListings,
    applicationForms: currentActualUser.applicationForms,
    donations: currentActualUser.donations,
    notifications: currentActualUser.notifications,
  };

  const formik = useFormik({
    initialValues: {
      isFirstTime: false,
      hasOtherPets: false,
      existingPetsOwned: 0,
      hasDailyExercise: false,
      sleepArea: null,
      petAloneTime: 0,
      reason: "",
      formType: "",
      member: m,
      animalListing: animalListing,
    },
    validate: (data) => {
      let errors = {};

      if (!data.reason) {
        errors.reason = "Reason is required";
      }

      if (!data.formType) {
        errors.formType = "Gender is required";
      }

      return errors;
    },

    onSubmit: (data) => {
      setFormData(data);
      console.log(data);
      delete data.accept;
      if (data.sleepArea != null) {
        data.sleepArea = data.sleepArea["name"];
      }
      data.formType = data.formType["name"];
      Api.createApplicationForm(data).then((response) => {
        if (response.status === 204) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Application form created",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail:
              "There was a problem creating the application form. Please try again.",
            life: 3000,
          });
        }
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

  let navigate = useNavigate();

  // used to let user navigate to login page when then try to access app form without login yet
  const navigateToSpecifiedPage = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Show login button and tell user to login if user is not logged in */}
      {!currentActualUser && (
        <>
          <div className="modal__wrapper">
            <div className="single__modal">
              <span className="close__modal">
                <i
                  className="ri-close-line"
                  onClick={() => setShowModal(false)}
                ></i>
              </span>
              <h6 className="text-center text-light">Wait a moment...</h6>
              <h6 className="text-center text-light">
                Please login before you can start adopting/fostering pets
              </h6>
              <Toast ref={toast} />
              <div className="form-demo">
                <div className="flex justify-content-center">
                  <div className="card">
                    <Button
                      label="Proceed to login"
                      onClick={() => navigateToSpecifiedPage('/login')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Tell user that you can't register your own animal listings lol */}
      {currentActualUser && currentActualUser.email === animalListing.member.email && (
        <>
          <div className="modal__wrapper">
            <div className="single__modal">
              <span className="close__modal">
                <i
                  className="ri-close-line"
                  onClick={() => setShowModal(false)}
                ></i>
              </span>
              <h6 className="text-center text-light">Oops!</h6>
              <h6 className="text-center text-light">
                <p>You are not allowed to submit an application form for your own animal listing. </p>
                <p>We know you are excited about your pets receiving new loves, so please click the button below to view the application forms submitted for your animal listing.</p>
              </h6>
              <Toast ref={toast} />
              <div className="form-demo">
                <div className="flex justify-content-center">
                  <div className="card">
                    <Button
                      label="Proceed to view application forms for this animal listing"
                      onClick={() => navigateToSpecifiedPage('/')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/*  Show application form if user is logged in */}
      {currentActualUser && currentActualUser.email !== animalListing.member.email && (
        <>
          <div className="modal__wrapper">
            <div className="single__modal">
              <span className="close__modal">
                <i
                  className="ri-close-line"
                  onClick={() => setShowModal(false)}
                ></i>
              </span>
              <h6 className="text-center text-light">Description</h6>
              <p
                className="text-center text-light"
                style={{ textAlign: "justify", overflowWrap: "break-word" }}
              >
                {" "}
                {description}{" "}
              </p>
              <h6 className="text-center text-light">
                Fill up the form below!
              </h6>
              <Toast ref={toast} />
              <div className="form-demo">
                <Dialog //Error: Dialog box not showing.
                  visible={showMessage}
                  onHide={() => setShowMessage(false)}
                  position="absolute"
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

                        <h5>Error! Application form not submitted!</h5>
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
                          style={{
                            fontSize: "5rem",
                            color: "var(--green-500)",
                            zIndex: 999999,
                          }}
                        ></i>

                        <h5>Submitted application form successfully!</h5>
                      </>
                    )}
                  </div>
                </Dialog>
                <div className="flex justify-content-center">
                  <div className="card">
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                      {/* isFirstTime checkbox */}
                      <div className="field-checkbox">
                        <Checkbox
                          inputId="isFirstTime"
                          name="isFirstTime"
                          checked={formik.values.isFirstTime}
                          onChange={formik.handleChange}
                        />
                        <label htmlFor="isFirstTime" style={{ color: "black" }}>
                          Is this your first time owning a pet? (Tick for true)
                        </label>
                      </div>

                      {/* hasOtherPets checkbox */}
                      <div className="field-checkbox">
                        <Checkbox
                          inputId="hasOtherPets"
                          name="hasOtherPets"
                          checked={formik.values.hasOtherPets}
                          onChange={formik.handleChange}
                        />
                        <label
                          htmlFor="hasOtherPets"
                          style={{ color: "black" }}
                        >
                          Do you have other pets? (Tick for true)
                        </label>
                      </div>

                      {/* Existing Pets Owned textbox */}
                      <div className="field" style={{ marginTop: "30px" }}>
                        <span className="p-float-label">
                          <InputText
                            id="existingPetsOwned"
                            name="existingPetsOwned"
                            value={formik.values.existingPetsOwned}
                            onChange={formik.handleChange}
                          />
                          <label htmlFor="existingPetsOwned">
                            Existing Pets Owned
                          </label>
                        </span>
                      </div>

                      {/* hasDailyExercise checkbox */}
                      <div className="field-checkbox">
                        <Checkbox
                          inputId="hasDailyExercise"
                          name="hasDailyExercise"
                          checked={formik.values.hasDailyExercise}
                          onChange={formik.handleChange}
                        />
                        <label htmlFor="hasDailyExercise">
                          Do your pet(s) have daily exercise? (If you have an
                          existing pet)
                        </label>
                      </div>

                      {/* Sleep Area dropdown list */}
                      <div className="field" style={{ marginTop: "30px" }}>
                        <span className="p-float-label">
                          <Dropdown
                            id="sleepArea"
                            name="sleepArea"
                            value={formik.values.sleepArea}
                            onChange={formik.handleChange}
                            options={sleepArea}
                            optionLabel="name"
                          />
                          <label htmlFor="sleepArea">
                            Sleep Area (If you have an existing pet)
                          </label>
                        </span>
                      </div>

                      {/* Pet Alone Time textbox */}
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id="petAloneTime"
                            name="petAloneTime"
                            value={formik.values.petAloneTime}
                            onChange={formik.handleChange}
                          />
                          <label htmlFor="petAloneTime">
                            Pet Alone Time (If you have an existing pet)
                          </label>
                        </span>
                      </div>

                      {/* Reason textbox */}
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id="reason"
                            name="reason"
                            value={formik.values.reason}
                            onChange={formik.handleChange}
                            className={classNames({
                              "p-invalid": isFormFieldValid("reason"),
                            })}
                          />
                          <label
                            htmlFor="reason"
                            className={classNames({
                              "p-error": isFormFieldValid("reason"),
                            })}
                          >
                            Reason*
                          </label>
                        </span>
                        {getFormErrorMessage("reason")}
                      </div>

                      {/* Form Type dropdown list */}
                      <div className="field">
                        <span className="p-float-label">
                          <Dropdown
                            id="formType"
                            name="formType"
                            value={formik.values.formType}
                            onChange={formik.handleChange}
                            options={formType}
                            optionLabel="name"
                            className={classNames({
                              "p-invalid": isFormFieldValid("formType"),
                            })}
                          />
                          <label
                            htmlFor="formType"
                            className={classNames({
                              "p-error": isFormFieldValid("formType"),
                            })}
                          >
                            Application Form Type*
                          </label>
                        </span>
                      </div>

                      {/* Submit button */}
                      <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
