import React, { useEffect } from "react";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import "./Login.scss"
import { useNavigate } from "react-router-dom";
import CustomButton from "../../themes/CustomButton";
import FormField from "../../components/form.field/FormField";
import { useSelector } from "react-redux";
import { login } from "../../redux/actions.creators/auth.action.creator";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks/hooks";

interface LoginFormValues {
  email: string,
  password: string,
  color: string
}
const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.get('isLoggedIn'))
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn)
      navigate("/profile")
  }, [navigate, isLoggedIn])
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    color: '#000',
  }
  const validate = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
    color: Yup.string()
      .required('Color is required'),
  })
  const handleSubmitForm = (values: LoginFormValues,
    formikProps: FormikHelpers<LoginFormValues>) => {
    const { setSubmitting } = formikProps;
    dispatch(login(values.email, values.password))
    setSubmitting(false);
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={
        validate
      }
      onSubmit={handleSubmitForm}
    >
      <Form className='form'>
        <FormField
          required={true}
          label="Email"
          name="email"
          type="email"
          placeholder="jane@formik.com" />
        <FormField
          required={true}
          label="Password"
          name="password"
          type="password"
          placeholder="your pass" />
        <FormField
          name="color"
          type="colorPicker"
          placeholder="your color" />
        <CustomButton color="mediumseagreen" type="submit">Submit</CustomButton>
      </Form>

    </Formik >
  )
}
export default LoginForm;
