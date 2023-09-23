import * as yup from "yup";

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});
