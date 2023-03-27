import React, { useEffect } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
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
  test: string
}
const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.get('isLoggedIn'))
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn)
      navigate("/profile")
  }, [navigate, isLoggedIn])
  const initialValues = {
    email: '',
    password: '',
    test: ''
  }
  const validate = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
    test: Yup.string().required('Test is required')
  })
  const handleSubmitForm = (values: LoginFormValues,
    formikProps: FormikHelpers<LoginFormValues>) => {
    // const { setSubmitting } = formikProps;
    // dispatch(login(values.email, values.password))
    // setSubmitting(false);
    console.log(values)
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
      {(form) => <Form className='form'>
        <FormField label="Test"
          name="test"
          type="colorPicker"
          placeholder="jane@formik.com" field={form.getFieldProps('test')} form={form} meta={form.getFieldMeta('test')} />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="jane@formik.com" component={FormField} />
        <Field
          label="Password"
          name="password"
          type="password"
          placeholder="your pass" component={FormField} />
        <CustomButton color="mediumseagreen" htmlType="submit">Submit</CustomButton>
      </Form>
      }
    </Formik >
  )
}
export default LoginForm;
