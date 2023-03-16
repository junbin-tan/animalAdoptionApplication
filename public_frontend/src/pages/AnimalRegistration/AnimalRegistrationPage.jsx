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
import "./AnimalRegistration.css";
import Api from "../../helpers/Api";
import Auth from "../../helpers/Auth";

// Initialize Userfront Core JS
Userfront.init("5nx5q8vb");

const AnimalRegistrationPage = () => {

  const gender = [
    { name: "MALE", code: "MALE" },
    { name: "FEMALE", code: "FEMALE" },
  ];

  const animalType = [
    { name: "DOG", code: "DOG" },
    { name: "CAT", code: "CAT" },
    { name: "HAMSTER", code: "HAMSTER" },
    { name: "RABBIT", code: "RABBIT" },
    { name: "OTHERS", code: "OTHERS" },
  ];

  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const formik = useFormik({
    initialValues: {
      image: "",
      age: "",
      name: "",
      gender: "",
      breed: "",
      weight: "",
      description: "",
      animalType: "",
      isNeutered: false,
    },
    validate: (data) => {
      let errors = {};

      if (!data.image) {
        errors.image = "Image is required.";
      }

      if (!data.age) {
        errors.age = "Age is required.";
      }

      if (!data.name) {
        errors.name = "Name is required.";
      }

      if (!data.gender) {
        errors.gender = "Gender is required.";
      }

      if (!data.breed) {
        errors.breed = "Breed is required";
      }

      if (!data.weight) {
        errors.weight = "Weight is required";
      }

      if (!data.description) {
        errors.description = "Description is required.";
      }

      if (!data.animalType) {
        errors.animalType= "Animal Type is required.";
      }

      if (!data.isNeutered) {
        errors.isNeutered= "Please indicate whether the animal is neutered.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      delete data.accept;
      data.gender = data.gender["name"];
      data.animalType = data.animalType["name"];
      Api.createAnimal(data).then((data) => setShowMessage(true));
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
            {/* when got error, show error message for register */}
            {formData.error && (
              <>
                <i
                  className="pi pi-times"
                  style={{ fontSize: "5rem", color: "var(--red-500)" }}
                ></i>

                <h5>Animal Registration Error!</h5>
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

                <h5>Animal Registration Successful!</h5>
              </>
            )}
          </div>
        </Dialog>
        <div className="flex justify-content-center">
          <div className="card">
            <h5 className="text-center">Animal Registration</h5>
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              {/* Image textbox */}
              <div className="field">
                <span className="p-float-label">
                  <InputText
                    id="image"
                    name="image"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("image"),
                    })}
                  />
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

              {/* Age textbox */}
              <div className="field">
                <span className="p-float-label">
                  <i className="pi pi-envelope" />
                  <InputText
                    id="age"
                    name="age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("age"),
                    })}
                  />
                  <label
                    htmlFor="age"
                    className={classNames({
                      "p-error": isFormFieldValid("age"),
                    })}
                  >
                    Age*
                  </label>
                </span>
                {getFormErrorMessage("age")}
              </div>

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

              {/* Gender dropdown list */}
              <div className="field">
                <span className="p-float-label">
                  <Dropdown
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    options={gender}
                    optionLabel="name"
                    className={classNames({
                      "p-invalid": isFormFieldValid("gender"),
                    })}
                  />
                  <label
                    htmlFor="gender"
                    className={classNames({
                      "p-error": isFormFieldValid("gender"),
                    })}
                  >
                    Gender
                  </label>
                </span>
              </div>

              {/* Breed textbox */}
              <div className="field">
                <span className="p-float-label">
                  <InputText
                    id="breed"
                    name="breed"
                    value={formik.values.breed}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("breed"),
                    })}
                  />
                  <label
                    htmlFor="breed"
                    className={classNames({
                      "p-error": isFormFieldValid("breed"),
                    })}
                  >
                    Breed*
                  </label>
                </span>
                {getFormErrorMessage("breed")}
              </div>

                {/* Weight textbox */}
                <div className="field">
                <span className="p-float-label">
                  <InputText
                    id="weight"
                    name="weight"
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("weight"),
                    })}
                  />
                  <label
                    htmlFor="weight"
                    className={classNames({
                      "p-error": isFormFieldValid("weight"),
                    })}
                  >
                    Weight*
                  </label>
                </span>
                {getFormErrorMessage("weight")}
              </div>
              
              {/* Description textbox */}
              <div className="field">
                <span className="p-float-label">
                  <InputText
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    autoFocus
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

              {/* Animal Type dropdown list */}
              <div className="field">
                <span className="p-float-label">
                  <Dropdown
                    id="animalType"
                    name="animalType"
                    value={formik.values.animalType}
                    onChange={formik.handleChange}
                    options={animalType}
                    optionLabel="name"
                    className={classNames({
                      "p-invalid": isFormFieldValid("animalType"),
                    })}
                  />
                  <label
                    htmlFor="animalType"
                    className={classNames({
                      "p-error": isFormFieldValid("animalType"),
                    })}
                  >
                    Type of Animal*
                  </label>
                </span>
              </div>

              {/* Neuteured checkbox */}
              <div className="field-checkbox">
                <Checkbox
                  inputId="isNeutered"
                  name="isNeutered"
                  checked={formik.values.isNeutered}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("isNeutered"),
                  })}
                />
                <label
                  htmlFor="isNeutered"
                  className={classNames({
                    "p-error": isFormFieldValid("isNeutered"),
                  })}
                >
                  Is the animal neuteured?*
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

export default AnimalRegistrationPage ;
