import * as yup from "yup"

export const saveProductValidationSchema = yup.object({
    name:yup.string().required().min(3, "Name should be at least 3 characters"),

    description: yup
    .string()
    .required()
    .min(3, "Description should bee at least 3 characters")
    .max(972, "Description should bee at most 072 characters"),

    brand: yup
    .string()
    .required()
    .min(3, "Brand should be at least 3 characters"),


    category: yup
    .string()
    .min(4, "Category should be at least 4 characters")
    .required(),

    price: yup.number().min(1, "Price should be at least 1").required()
})