import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import Api from "../../helpers/Api";
import UserContext from "../../helpers/context/UserContext";
import "./CreateEventListing.css";
import ImageUploaderCloud from "../../helpers/ImageUploaderCloud";

const CreateEventListing = () => {
  const { currentActualUser } = useContext(UserContext);

  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [eventImg, setEventImg] = useState();

  const eventType = [
    { name: "GATHERING", code: "GATHERING" },
    { name: "PET_TRAINING", code: "PET TRAINING" },
    { name: "EXPO", code: "EXPO" },
    { name: "CHARITY", code: "CHARITY" },
    { name: "COMPETITION", code: "COMPETITION" },
  ];

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

  const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
            // setEventImg(base64data);
        };

        setEventImg(file);
    };

  const formik = useFormik({
    initialValues: {
      eventName: "",
      dateAndTime: null,
      location: "",
      capacity: 0,
      description: "",
      eventType: "",
      image: "",
      
      member: m,
    },
    validate: (data) => {
      let errors = {};


      // if (!data.image) {
      //   errors.image = "Image is required";
      // }
      if (!eventImg) {
        errors.image = "Image is required";
      }

      if (!data.eventName) {
        errors.eventName = "Event Name is required";
      }

      if (!data.location) {
        errors.location = "Location is required";
      }

      if (!data.capacity) {
        errors.capacity = "Capacity is required";
      }
      
      if (!data.eventType) {
        errors.eventType = "Event Type is required";
      }

      if (!data.description) {
        errors.description = "Description is required";
      }
      
      if (!data.dateAndTime) {
        errors.description = "Date And Time is required";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      console.log(data);
      delete data.accept;
      data.eventType = data.eventType["name"];
      if (data.fosterStartDate != null) {
        data.fosterStartDate = data.fosterStartDate.toISOString();
      }
      if (data.fosterEndDate != null) {
        data.fosterEndDate = data.fosterEndDate.toISOString();
      }

      const eventImage = eventImg && eventImg;
      // console.log(animalImage);
      ImageUploaderCloud.uploadImgToCloud(eventImage).then((response) => {
        if (response.Location) {
          data.image = response.Location;
          console.log(data);
          Api.createEventListing(data).then((data) => setShowMessage(true));
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

  return (
    <>
      <h2 className="text-center">Create Event Listing</h2>
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
            {/* when got error, show error message for register */}
            {formData.error && (
              <>
                <i
                  className="pi pi-times"
                  style={{ fontSize: "5rem", color: "var(--red-500)" }}
                ></i>

                <h5>Creation of Event Listing Error!</h5>
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

                <h5>Creation of Event Listing Successful!</h5>
              </>
            )}
          </div>
        </Dialog>
        <div className="flex justify-content-center">
          <div className="card">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              {/* Description textbox */}
              <div className="field">
                <span className="p-float-label">
                  <InputText
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("description"),
                    })}
                  />
                  <label
                    htmlFor="description"
                    className={classNames({
                      "p-error": isFormFieldValid("description"),
                    })}
                  >
                    Description*
                  </label>
                </span>
                {getFormErrorMessage("description")}
              </div>

              {/* Image textbox */}
              <div className="field">
                <span className="p-float-label">
                  <FileUpload
                    name="image"
                    accept="image/*"
                    mode="advanced"
                    customUpload
                    auto={true}
                    uploadHandler={customBase64Uploader}
                    // cancelOptions={{style:{display: "none"}}}
                    // uploadOptions={{style:{display: "none"}}}
                    maxFileSize={10000000}
                    emptyTemplate={
                      <p className="m-0">
                        Drag and drop files to here to upload.
                      </p>
                    }
                  />

                  {/* <InputText
                    id="image"
                    name="image"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("image"),
                    })}
                  /> */}
                  <label
                    htmlFor="image"
                    className={classNames({
                      "p-error": isFormFieldValid("image"),
                    })}
                  >
                    Image*
                  </label>
                </span>
                {getFormErrorMessage("Image")}
              </div>


              {/* Name textbox */}
              <div className="field">
                <span className="p-float-label">
                  <InputText
                    id="eventName"
                    name="eventName"
                    value={formik.values.eventName}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("eventName"),
                    })}
                  />
                  <label
                    htmlFor="eventName"
                    className={classNames({
                      "p-error": isFormFieldValid("eventName"),
                    })}
                  >
                    eventName*
                  </label>
                </span>
                {getFormErrorMessage("eventName")}
              </div>


              {/* Animal Type dropdown list */}
              <div className="field">
                <span className="p-float-label">
                  <Dropdown
                    id="eventType"
                    name="eventType"
                    value={formik.values.eventType}
                    onChange={formik.handleChange}
                    options={eventType}
                    optionLabel="name"
                    className={classNames({
                      "p-invalid": isFormFieldValid("eventType"),
                    })}
                  />
                  <label
                    htmlFor="eventType"
                    className={classNames({
                      "p-error": isFormFieldValid("eventType"),
                    })}
                  >
                    Type of Event*
                  </label>
                </span>
              </div>


              {/* Breed textbox */}
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
                    location*
                  </label>
                </span>
                {getFormErrorMessage("location")}
              </div>

              {/* Weight textbox */}
              <div className="field">
                <span className="p-float-label">
                  <InputText
                    id="capacity"
                    name="capacity"
                    value={formik.values.capacity}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("capacity"),
                    })}
                  />
                  <label
                    htmlFor="capacity"
                    className={classNames({
                      "p-error": isFormFieldValid("capacity"),
                    })}
                  >
                    capacity*
                  </label>
                </span>
                {getFormErrorMessage("capacity")}
              </div>


             

             

              {/* Start date textbox (For fostering only) */}
              <div className="field">
                <span className="p-float-label">
                  <Calendar
                    id="dateAndTime"
                    name="dateAndTime"
                    value={formik.values.dateAndTime}
                    onChange={formik.handleChange}
                    dateFormat="dd/mm/yy"
                    autoFocus
                  />
                  <label htmlFor="dateAndTime">
                    Date And Time 
                  </label>
                </span>
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

export default CreateEventListing;