import React from 'react';
import { Formik, Form, Field, ErrorMessage, useField, FormikProps } from "formik";
import * as Yup from "yup";
const RegisterForm: React.FC = () => (
    <Formik
        initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }}
        validationSchema={Yup.object({
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
                .required('Password is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 400);
        }}
    >
        <Form>
            <Field
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Jane"
            />
            <ErrorMessage name="firstName">{(msg) => <p>{msg}</p>}</ErrorMessage>
            <Field
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Doe"
            />
            <ErrorMessage name="lastName">{(msg) => <p>{msg}</p>}</ErrorMessage>
            <Field
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@formik.com"
            />
            <ErrorMessage name="email">{(msg) => <p>{msg}</p>}</ErrorMessage>
            <Field
                label="Password"
                name="password"
                type="password"
                placeholder="jane@formik.com"
            />
            <ErrorMessage name="password">{(msg) => <p>{msg}</p>}</ErrorMessage>
            <button type="submit">Submit</button>
        </Form>
    </Formik>
);

export default RegisterForm;