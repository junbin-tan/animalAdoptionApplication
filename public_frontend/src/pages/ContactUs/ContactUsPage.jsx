import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import "./ContactUsPage.css";

const ContactUsPage = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const formik = useFormik({
        initialValues: {
          name: "",
          email: "",
          message: "",
        },
        validate: (data) => {
          let errors = {};
    
          if (!data.email) {
            errors.email = "Email is required.";
          
          }    
        
          if (!data.name) {
            errors.name = "Name is required.";
        
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
          
         ) {
            errors.email = "Invalid email address. E.g. example@email.com";
          }
          
          return errors;
        },

        onSubmit: (data) => {
          setFormData(data);
          delete data.accept; 
        //   data.residentialType = data.residentialType['name']; //extract out residential type value (HDB, LANDED, CONDO)
        //   console.log(data);
        //   Api.createMember(data).then((data) => setShowMessage(true));
    
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
    <h2> Drop us a message! </h2>
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

                {/* Message textbox */}
                <div className="field">
                <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <InputText
                    id="message"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    className={classNames({
                        "p-invalid": isFormFieldValid("message"),
                    })}
                    />
                    <label
                    htmlFor="message"
                    className={classNames({
                        "p-error": isFormFieldValid("message"),
                    })}
                    >
                    Drop us a message!*
                    </label>
                </span>
                {getFormErrorMessage("message")}
                </div>

                {/* Submit button */}
                <Button type="submit" label="Send" className="mt-2" />
            </form>
            </div>
        </div> 
    </>
  );
}

export default ContactUsPage;