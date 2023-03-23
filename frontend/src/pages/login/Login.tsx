import React, { useEffect } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { login } from "../../redux.toolkit/actions/auth.actions";
import { useAppDispatch } from "../../hooks/hooks";
import "./Login.scss"
import { useNavigate } from "react-router-dom";
import CustomButton from "../../themes/CustomButton";
import FormField from "../../components/form.field/FormField";
import { useSelector } from "react-redux";
import { RootState } from "../../redux.toolkit/store";

interface LoginFormValues {
  email: string,
  password: string,
}
const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  useEffect(() => {
    if (token !== null)
      navigate("/profile")
  }, [navigate, token])
  const initialValues = {
    email: '',
    password: '',
  }
  const validate = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
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
      onSubmit={(values: LoginFormValues,
        formikProps: FormikHelpers<LoginFormValues>) => handleSubmitForm(values, formikProps)
      }
    >
      <Form className='form'>
        <Field
          required={true}
          className='form-item'
          label="Email Address"
          name="email"
          type="email"
          placeholder="jane@formik.com"
          component={FormField}
        />
        <Field
          required={true}
          className='form-item'
          label="Password"
          name="password"
          type="password"
          placeholder="your pass"
          component={FormField}
        />
        <CustomButton color="mediumseagreen" htmlType="submit">Submit</CustomButton>
      </Form>
    </Formik >
  )
}
export default LoginForm;
