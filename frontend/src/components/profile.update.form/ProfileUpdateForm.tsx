import React from "react"
import { User } from "../../models/user.interface"
import { Formik, FormikHelpers, Form, Field, ErrorMessage, FieldArray } from "formik"
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/hooks";
import { updateProfile } from "../../redux/actions/auth.actions";
import { FeedPost } from "../../models/post.interface";

interface ProfileProps {
    user: User
    // many many
}

interface ProfileFormValues {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    feedPosts: FeedPost[]
}

const ProfileUpdateForm: React.FC<ProfileProps> = (props: ProfileProps) => {
    const userData = props.user
    const dispatch = useAppDispatch()
    const handleSubmitForm = (values: ProfileFormValues,
        formikProps: FormikHelpers<ProfileFormValues>) => {
        const { setSubmitting } = formikProps;
        const data: User = {
            id: userData.id,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            feedPosts: values.feedPosts
        }
        if (values.password.length > 0)
            data.password = values.password
        dispatch(updateProfile(data))
        setSubmitting(false);
    }
    return (
        <Formik
            initialValues={{
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || '',
                password: '',
                confirmPassword: '',
                feedPosts: userData.feedPosts || []
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
                    password: Yup.string(),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], 'Passwords must match')
                })
            }
            onSubmit={(values: ProfileFormValues,
                formikProps: FormikHelpers<ProfileFormValues>) => handleSubmitForm(values, formikProps)
            }
        >
            {({ values }) => (
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
                    <FieldArray name="feedPosts">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.feedPosts.length > 0 &&
                                    values.feedPosts.map((post, index) => (
                                        <div className="row" key={index}>
                                            <div className="col">
                                                <label htmlFor={`feedPosts.${index}.body`}>Body</label>
                                                <Field
                                                    name={`feedPosts.${index}.body`}
                                                    placeholder="Jane Doe"
                                                    type="text"
                                                />
                                                <ErrorMessage
                                                    name={`feedPosts.${index}.body`}
                                                    component="div"
                                                    className="field-error"
                                                />
                                            </div>
                                            <div className="col">
                                                <button
                                                    type="button"
                                                    className="secondary"
                                                    onClick={() => remove(index)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                <button
                                    type="button"
                                    className="secondary"
                                    onClick={() => push({ body: '' })}
                                >
                                    Add Post
                                </button>
                            </div>
                        )}
                    </FieldArray>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik >
    )
}

export default ProfileUpdateForm