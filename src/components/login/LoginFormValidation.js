import * as yup from "yup"
export const loginValidationSchema = yup.object({
    email:yup.string().email("Invalid Email"),
    password: yup
    .string()
    .required()
    .min(8, "Password Should Be At Least 8 Characters Long")
    .max(50, "Password Should Be At Most 50 Characters Long"),
})