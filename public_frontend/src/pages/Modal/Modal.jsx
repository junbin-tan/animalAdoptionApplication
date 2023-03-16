import React from "react";
import { useFormik } from "formik";
import "./modal.css";

const Modal = ({ setShowModal }) => {
  /* const sleepArea = [
    { name: "Indoor", code: "INDOOR" },
    { name: "Outdoor", code: "OUTDOOR" },
    { name: "Outdoor With Shelter", code: "OUTDOOR_WITH_SHELTER" },
  ];

  const formType = [
    { name: "Adoption only", code: "ADOPTION" },
    { name: "Fostering Only", code: "FOSTERING" },
    { name: "Adoption and Fostering", code: "ADOPTION_FOSTERING" },
  ];

  const formik = useFormik({
    initialValues: {
      email: "",
      isFirstTime: false,
      hasOtherPets: false,
      existingPetsOwned: "",
      hasDailyExercise: false,
      sleepArea: "",
      petAloneTime: "",
      reason: "",
      applicationStatus: "SUBMITTED",
      formType: "",
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
  ); */

  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">
          Description
        </h6>
        <p style={{textAlign: "justify"}}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Id eu nisl nunc mi ipsum faucibus. Nisl nisi scelerisque eu ultrices. Imperdiet dui accumsan sit amet nulla facilisi. 
            Non diam phasellus vestibulum lorem sed. Ac felis donec et odio pellentesque diam volutpat commodo sed. 
            Arcu cursus vitae congue mauris rhoncus. Mauris augue neque gravida in fermentum et sollicitudin ac. 
            Et tortor consequat id porta nibh venenatis cras sed felis. </p>
        <h6 className="text-center text-light">
          Fill up the form below!
        </h6>

        <div className="input__item mb-4">
          <h6>Email Address</h6>
          <input type="email" placeholder="E.g. johndoe@email.com" />
        </div>

        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default Modal;
