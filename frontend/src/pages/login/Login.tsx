import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/actions/auth.actions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import "./Login.scss"
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string,
  password: string,
}
const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.auth.token)
  const navigate = useNavigate()
  useEffect(() => {
    if (token !== null)
      navigate("/profile")
  }, [navigate, token])
  const handleSubmitForm = (values: LoginFormValues,
    formikProps: FormikHelpers<LoginFormValues>) => {
      const { setSubmitting } = formikProps;
      dispatch(login(values.email, values.password))
      setSubmitting(false);
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={
        Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
          password: Yup.string()
            .required('Password is required'),
        })
      }
      onSubmit={(values: LoginFormValues,
        formikProps: FormikHelpers<LoginFormValues>) => handleSubmitForm(values, formikProps)
      }
    >
      <Form className='form'>
        <Field
          className='form-item'
          label="Email Address"
          name="email"
          type="email"
          placeholder="jane@formik.com"
        />
        <ErrorMessage className='error' name="email">{(msg) => <p>{msg}</p>}</ErrorMessage>
        <Field
          className='form-item'
          label="Password"
          name="password"
          type="password"
          placeholder="your pass"
        />
        <ErrorMessage className='error' name="password">{(msg) => <p>{msg}</p>}</ErrorMessage>
        <button type="submit">Submit</button>
      </Form>
    </Formik >
  )
}
export default LoginForm;
