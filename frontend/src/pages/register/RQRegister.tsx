import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import "./Register.scss"
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { register } from '../../services/auth.service'
import CustomButton from '../../themes/CustomButton';
import FormField from '../../components/form.field/FormField';
import { InputTypes } from "../../components/form.field/InputType";
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
    const initialValues: RegisterFormValues = {
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
                <FormField
                    required={true}
                    label="First Name"
                    name="firstName"
                    type={InputTypes.TEXT}
                    placeholder="Jane"
                />
                <FormField
                    required={true}
                    label="Last Name"
                    name="lastName"
                    type={InputTypes.TEXT}
                    placeholder="Doe"
                />
                <FormField
                    required={true}
                    label="Email Address"
                    name="email"
                    type={InputTypes.EMAIL}
                    placeholder="jane@formik.com"
                />
                <FormField
                    required={true}
                    label="Password"
                    name="password"
                    type={InputTypes.PASSWORD}
                    placeholder="your pass"
                />
                <FormField
                    required={true}
                    label="Confirm password"
                    name="confirmPassword"
                    type={InputTypes.PASSWORD}
                    placeholder="confirm your pass"
                />
                <CustomButton color="mediumseagreen" type="submit">Submit</CustomButton>
            </Form>
        </Formik >
        </>
    )
}

export default RQRegisterForm;