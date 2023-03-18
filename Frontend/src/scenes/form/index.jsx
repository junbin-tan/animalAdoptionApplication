import { Box, Button, FormLabel, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/AdminHeader";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
};

const phoneRegExp =
    /^\+65(6|8|9)\d{7}$/;

const userSchema = yup.object().shape(
    {
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        email: yup.string().email("invalid email").required("required"),
        contact: yup.string().matches(phoneRegExp," Phone number is not valid").required("required"),
        address1: yup.string().required("required"),
        address2: yup.string().required("required"),
    }
);

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    }
    return (<Box m ="20px">
        <Header title = "CREATE USER" subtitle= "Create a New User Profile"/>
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema = {userSchema}
        >
            {({values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Box display = "grid" gap = "30px" gridTemplateColumns="repeat(4, minmax(0,1fr))"
                    sx = {{
                        "& > div" : {gridColumn : isNonMobile ? undefined : "span 4"},

                    }}> 
                        <TextField
                            fullWidth
                            variant="filled"
                            type = "text"
                            label = "First Name"
                            //changes functions when touched and untouch
                            onBlur={handleBlur}
                            onChange = {handleChange}
                            value = {values.firstName}
                            name = "firstName"
                            // if touched and clicked out 
                            error={!! touched.firstName && !! errors.firstName}
                            helperTexted= {touched.firstName && errors.firstName}
                            sx = {{gridColumn : "span 2"}}
                        />
                         <TextField
                            fullWidth
                            variant="filled"
                            type = "text"
                            label = "Last Name"
                            //changes functions when touched and untouch
                            onBlur={handleBlur}
                            onChange = {handleChange}
                            value = {values.lastName}
                            name = "lastName"
                            // if touched and clicked out 
                            error={!! touched.lastName && !! errors.lastName}
                            helperTexted= {touched.lastName && errors.lastName}
                            sx = {{gridColumn : "span 2"}}
                        />
                         <TextField
                            fullWidth
                            variant="filled"
                            type = "text"
                            label = "Email"
                            //changes functions when touched and untouch
                            onBlur={handleBlur}
                            onChange = {handleChange}
                            value = {values.email}
                            name = "email"
                            // if touched and clicked out 
                            error={!! touched.email && !! errors.email}
                            helperTexted= {touched.email && errors.email}
                            sx = {{gridColumn : "span 4"}}
                        />
                         <TextField
                            fullWidth
                            variant="filled"
                            type = "text"
                            label = "Contact Number"
                            //changes functions when touched and untouch
                            onBlur={handleBlur}
                            onChange = {handleChange}
                            value = {values.contact}
                            name = "contact"
                            // if touched and clicked out 
                            error={!! touched.contact && !! errors.contact}
                            helperTexted= {touched.contact && errors.contact}
                            sx = {{gridColumn : "span 4"}}
                        />
                         <TextField
                            fullWidth
                            variant="filled"
                            type = "text"
                            label = "Address 1"
                            //changes functions when touched and untouch
                            onBlur={handleBlur}
                            onChange = {handleChange}
                            value = {values.address1}
                            name = "address1"
                            // if touched and clicked out 
                            error={!! touched.address1 && !! errors.address1}
                            helperTexted= {touched.address1 && errors.address1}
                            sx = {{gridColumn : "span 4"}}
                        />
                         <TextField
                            fullWidth
                            variant="filled"
                            type = "text"
                            label = "Address 2"
                            //changes functions when touched and untouch
                            onBlur={handleBlur}
                            onChange = {handleChange}
                            value = {values.address2}
                            name = "address2"
                            // if touched and clicked out 
                            error={!! touched.address2 && !! errors.address2}
                            helperTexted= {touched.address2 && errors.address2}
                            sx = {{gridColumn : "span 4"}}
                        />
                    </Box>
                    <Box display = "flex" justifyContent="end" mt="20px">
                        <Button type ="submit" color = "secondary" variant = "contained"> 
                            Create New User
                        </Button>
                    </Box>
                </form>
            )}

        </Formik>
    </Box>)
}

export default Form;