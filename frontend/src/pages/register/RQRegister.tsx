import React from 'react';
import { Formik, Form, Field, ErrorMessage, useField, FormikProps, FormikValues, FormikHelpers } from "formik";
import * as Yup from "yup";
import "./Register.scss"
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { register } from '../../services/auth.service'
interface RegisterFormValues {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const RQRegisterForm = () => {
    const navigate = useNavigate()
    const registerMutation = useMutation(register, {
        onSuccess: (data) => {
            console.log(data.data)
        },
        onError: (err) => {
            console.log(err)
        }
    })
    const handleSubmitForm = (values: RegisterFormValues,
        formikProps: FormikHelpers<RegisterFormValues>) => {
            const { setSubmitting } = formikProps;
            registerMutation.mutate({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password
            })
            setSubmitting(false);
            navigate("/")
    }
    return (
        <>
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={
                Yup.object({
                    firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('First name is required'),
                    lastName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Last name is required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Email is required'),
                    password: Yup.string()
                        .required('Password is required'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], 'Passwords must match')
                })
            }
            onSubmit={(values: RegisterFormValues,
                formikProps: FormikHelpers<RegisterFormValues>) => handleSubmitForm(values, formikProps)
            }
        >
            <Form className='form'>
                <Field
                    className='form-item'
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="Jane"
                />
                <ErrorMessage className='error' name="firstName">{(msg) => <p>{msg}</p>}</ErrorMessage>
                <Field
                    className='form-item'
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                />
                <ErrorMessage className='error' name="lastName">{(msg) => <p>{msg}</p>}</ErrorMessage>
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
                <Field
                    className='form-item'
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    placeholder="confirm your pass"
                />
                <ErrorMessage className='error' name="confirmPassword">{(msg) => <p>{msg}</p>}</ErrorMessage>
                <button type="submit">Submit</button>
            </Form>
        </Formik >
        </>
    )
}

export default RQRegisterForm;