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
import moment from 'moment-timezone';
import "./modalevent.css";

const ModalEvent = ({ setShowModal,eventname, description, eventListing}) => {
  const { currentActualUser } = useContext(UserContext);

  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const toast = useRef(null);

  const date = eventListing.dateAndTime;
  const formattedDate = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').tz('Asia/Shanghai').format('MMMM Do YYYY, h:mm a');

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
      isActive: true,
      eventListing: eventListing,
      member: m,
    },
    validate: (data) => {
      let errors = {};
 
      if (!data.eventListing) {
        errors.eventListing = "eventListing is required";
      }

      if (!data.member) {
        errors.member = "member is required";
      }
           

      return errors;
    },

    onSubmit: (data) => {
      setFormData(data);
      console.log(data);
      delete data.accept;
      
      //if (data.sleepArea != null) {
      //  data.sleepArea = data.sleepArea["name"];
     // }
     // data.formType = data.formType["name"];
      Api.createEventRegistration(data).then((response) => {
        if (response.status === 204) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Event Successfully Registered",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail:
              "There was a problem creating the Event Registration. Please try again.",
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
          <div className="modal__wrapper_event">
            <div className="single__modal_event">
              <span className="close__modal_event">
                <i
                  className="ri-close-line"
                  onClick={() => setShowModal(false)}
                ></i>
              </span>
              <h6 className="text-center text-light">Wait a moment...</h6>
              <h6 className="text-center text-light">
                Please login before you can register for event
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

      
      {/* Tell user that you can't register your own events lol */}
      {currentActualUser && currentActualUser.email === eventListing.member.email && (
        <>
          <div className="modal__wrapper_event">
            <div className="single__modal_event">
              <span className="close__modal_event">
                <i
                  className="ri-close-line"
                  onClick={() => setShowModal(false)}
                ></i>
              </span>
              <h6 className="text-center text-light">Oops!</h6>
              <h6 className="text-center text-light">
                <p>You are not allowed to register for your own event </p>
                <p>We know you are excited about your event, but you are not allowed to register for your own event.</p>
              </h6>
   
            </div>
          </div>
        </>
      )}
      
     
      {/*  Show application form if user is logged in */}
      {currentActualUser && currentActualUser.email !== eventListing.member.email && (
        <>
          <div className="modal__wrapper_event">
            <div className="single__modal_event">
              <span className="close__modal_event">
                <i
                  className="ri-close-line"
                  onClick={() => setShowModal(false)}
                ></i>
              </span>
            
              <p
                className="text-center text-light"
                style={{ textAlign: "justify", overflowWrap: "break-word" }}
              >
                {" "}
                <h1>
                {eventListing.eventName}{" "}
                </h1>   
                <h2>
                {description}{" "}
                </h2>             

                <h6>Date and Time : {formattedDate}{" "} </h6>
                
                <h6>Location : {eventListing.location}{" "} </h6>

                <h6>Type : {eventListing.eventType}{" "} </h6>

                <h6>Capacity : {eventListing.capacity}{" "} </h6>
                
                <div className="modal_event_image">
                  <img src= {eventListing.image} alt="image"></img>
                </div>
                
                
                
                
              </p>

              
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

                        <h5>Error! Event Not registered!</h5>
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

                        <h5>Registered for event successfully!</h5>
                      </>
                    )}
                  </div>
                </Dialog>
                <div className="flex justify-content-center">               
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                      {/* isFirstTime checkbox */}
  
                      {/* Submit button */}
                      <Button type="submit" label="Register" className="mt-2" />
                    </form>             
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModalEvent;
