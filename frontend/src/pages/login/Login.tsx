import React, { useEffect } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import "./Login.scss"
import { useNavigate } from "react-router-dom";
import CustomButton from "../../themes/CustomButton";
import FormField from "../../components/form.field/FormField";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions.creators/auth.action.creator";
import { RootState } from "../../redux/store";

interface LoginFormValues {
  email: string,
  password: string,
}
const LoginForm: React.FC = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.get('isLoggedIn'))
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn)
      navigate("/profile")
  }, [navigate, isLoggedIn])
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
      dispatch<any>(login(values.email, values.password))
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
