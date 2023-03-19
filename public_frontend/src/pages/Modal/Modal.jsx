import React from "react";
import { useFormik } from "formik";
import "./modal.css";

const Modal = ({ setShowModal }) => {
  // const gender = [
  //   { name: "MALE", code: "MALE" },
  //   { name: "FEMALE", code: "FEMALE" },
  // ];

  // const animalType = [
  //   { name: "DOG", code: "DOG" },
  //   { name: "CAT", code: "CAT" },
  //   { name: "HAMSTER", code: "HAMSTER" },
  //   { name: "RABBIT", code: "RABBIT" },
  //   { name: "OTHERS", code: "OTHERS" },
  // ];

  // const [showMessage, setShowMessage] = useState(false);
  // const [formData, setFormData] = useState({});

  // const formik = useFormik({
  //   initialValues: {
  //     image: "",
  //     age: "",
  //     name: "",
  //     gender: "",
  //     breed: "",
  //     weight: "",
  //     description: "",
  //     animalType: "",
  //     isNeutered: false,
  //   },
  //   validate: (data) => {
  //     let errors = {};

  //     if (!data.image) {
  //       errors.image = "Image is required.";
  //     }

  //     if (!data.age) {
  //       errors.age = "Age is required.";
  //     }

  //     if (!data.name) {
  //       errors.name = "Name is required.";
  //     }

  //     if (!data.gender) {
  //       errors.gender = "Gender is required.";
  //     }

  //     if (!data.breed) {
  //       errors.breed = "Breed is required";
  //     }

  //     if (!data.weight) {
  //       errors.weight = "Weight is required";
  //     }

  //     if (!data.description) {
  //       errors.description = "Description is required.";
  //     }

  //     if (!data.animalType) {
  //       errors.animalType= "Animal Type is required.";
  //     }

  //     if (!data.isNeutered) {
  //       errors.isNeutered= "Please indicate whether the animal is neutered.";
  //     }

  //     return errors;
  //   },
  //   onSubmit: (data) => {
  //     setFormData(data);
  //     delete data.accept;
  //     data.gender = data.gender["name"];
  //     data.animalType = data.animalType["name"];
  //     Api.createAnimal(data).then((data) => setShowMessage(true));
  //     formik.resetForm();
  //   },
  // });

  // const isFormFieldValid = (name) =>
  //   !!(formik.touched[name] && formik.errors[name]);
  // const getFormErrorMessage = (name) => {
  //   return (
  //     isFormFieldValid(name) && (
  //       <small className="p-error">{formik.errors[name]}</small>
  //     )
  //   );
  // };

  // const dialogFooter = (
  //   <div className="flex justify-content-center">
  //     <Button
  //       label="OK"
  //       className="p-button-text"
  //       autoFocus
  //       onClick={() => setShowMessage(false)}
  //     />
  //   </div>
  // );


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
