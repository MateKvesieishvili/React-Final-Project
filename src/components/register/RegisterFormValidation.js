import * as yup from "yup"

export const registerValidationSchema = yup.object({
    firstName: yup
    .string()
    .required("First Name Is Required")
    .min(3, "First Name Should Be At Least 3 Characters Long")
    .max(24, "First Name Should Be At Most 24 Characters Long"),
    lastName: yup
    .string()
    .min(3, "Last Name Should Be At Least 3 Characters Long")
    .max(24, "Last Name Should Be At Most 24 Characters Long"),
    email: yup
    .string()
    .email("Invalid Email Address")
    .required(),
    password: yup
    .string()
    .required()
    .min(8, "Last Name Should Be At Least 8 Characters Long")
    .max(50, "Last Name Should Be At Most 50 Characters Long"),
})