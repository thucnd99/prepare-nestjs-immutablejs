import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import "./Register.scss"
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { register } from '../../services/auth.service'
import CustomButton from '../../themes/CustomButton';
import FormField from '../../components/form.field/FormField';
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
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const validate = Yup.object({
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
            initialValues={initialValues}
            validationSchema={
                validate
            }
            onSubmit={(values: RegisterFormValues,
                formikProps: FormikHelpers<RegisterFormValues>) => handleSubmitForm(values, formikProps)
            }
        >
            <Form className='form'>
                <Field
                    required={true}
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="Jane"
                    component={FormField}
                />
                <Field
                    required={true}
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    component={FormField}
                />
                <Field
                    required={true}
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="jane@formik.com"
                    component={FormField}
                />
                <Field
                    required={true}
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="your pass"
                    component={FormField}
                />
                <Field
                    required={true}
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    placeholder="confirm your pass"
                    component={FormField}
                />
                <CustomButton color="mediumseagreen" htmlType="submit">Submit</CustomButton>
            </Form>
        </Formik >
        </>
    )
}

export default RQRegisterForm;