import * as yup from "yup";

export const initialValues = {
  name: "",
  email: "",
  password: "",
};

export const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});
