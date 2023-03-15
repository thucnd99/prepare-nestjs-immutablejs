import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import "./Login.scss"
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { login, setToken } from "../../services/auth.service";
import CustomButton from "../../themes/CustomButton";
import CustomFormikField from "../../themes/CustomFormItem";

interface LoginFormValues {
    email: string,
    password: string,
}
const RQLoginForm: React.FC = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const loginMutation = useMutation(({ email, password }: { email: string, password: string }) => login(email, password), {
        onSuccess: (data, variables, context) => {
            console.log(data.data)
            setToken(data.data.token);
            navigate("/profile");
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
        onSettled(data, error, variables, context) {
            queryClient.invalidateQueries('get-current');
        },
    })
    const handleSubmitForm = (values: LoginFormValues,
        formikProps: FormikHelpers<LoginFormValues>) => {
        const { setSubmitting } = formikProps;
        loginMutation.mutate({ email: values.email, password: values.password })
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
                <CustomFormikField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="jane@formik.com"
                />
                <ErrorMessage className='error' name="email">{(msg) => <p>{msg}</p>}</ErrorMessage>
                <CustomFormikField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="your pass"
                />
                <ErrorMessage className='error' name="password">{(msg) => <p>{msg}</p>}</ErrorMessage>
                <CustomButton color="mediumseagreen" htmlType="submit">Submit</CustomButton>
            </Form>
        </Formik >
    )
}
export default RQLoginForm;
