import { Label, Checkbox, Button } from "../../Atoms";
import { FormField } from "../../Moleluces";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./loginFormSchema";
import { Link } from "react-router-dom";
import useTheme from "../../context/useTheme";

interface LoginFormProps {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (values: LoginFormProps) => void;
}

const LoginForm = ({ onSubmit }: Props) => {
  const { theme } = useTheme();
  const handleSubmit = (values: LoginFormProps) => {
    onSubmit(values);
  };

  const formMik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={formMik.handleSubmit}>
      <div>
        <FormField
          type="email"
          name="email"
          id="email"
          placeholder="name@company.com"
          label="Your email"
          value={formMik.values.email}
          onChange={formMik.handleChange("email")}
          status={formMik.errors.email && "error"}
        />
        {formMik.errors.email && <p>{formMik.errors.email}</p>}
      </div>
      <div>
        <FormField
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          label="Password"
          value={formMik.values.password}
          onChange={formMik.handleChange("password")}
          status={formMik.errors.password && "error"}
        />
        {formMik.errors.password && <p>{formMik.errors.password}</p>}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <Checkbox
              id="remember"
              required
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <Label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Remember me
            </Label>
          </div>
        </div>
        <a
          href="#"
          className={`text-sm font-medium text-primary-600 hover:underline ${
            theme === "light" ? "" : "dark:text-primary-500"
          }`}
        >
          Forgot password?
        </a>
      </div>
      <Button
        type={"submit"}
        className={`w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
          theme === "light"
            ? ""
            : "dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        }`}
      >
        Sign in
      </Button>
      <p
        className={`text-sm font-light ${
          theme === "light" ? "text-gray-500" : "dark:text-gray-400"
        }`}
      >
        Don’t have an account yet?{" "}
        <Link
          to="/register"
          className={`font-medium text-primary-600 hover:underline ${
            theme === "light" ? "" : "dark:text-primary-500"
          }`}
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
