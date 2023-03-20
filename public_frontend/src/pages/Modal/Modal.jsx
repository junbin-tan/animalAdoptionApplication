import React from "react";
import { useFormik } from "formik";
import "./modal.css";

const Modal = ({ setShowModal, description }) => {
  
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">
          Description
        </h6>
        <p style={{textAlign: "justify"}}> {description} </p>
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
