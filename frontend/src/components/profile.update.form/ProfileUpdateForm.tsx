import React from "react"
import { User } from "../../models/user.interface"
import { Formik, FormikHelpers, Form, Field, ErrorMessage, FieldArray } from "formik"
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/hooks";
import { updateProfile } from "../../redux/actions/auth.actions";
import { FeedPost } from "../../models/post.interface";
import { SketchPicker } from 'react-color';

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
    feedPosts: FeedPost[],
    colorPicker: string,
}

const ProfileUpdateForm: React.FC<ProfileProps> = (props: ProfileProps) => {
    const userData = props.user
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
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
        console.log(values);
    }

    return (
        <Formik
            initialValues={{
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || '',
                password: '',
                confirmPassword: '',
                feedPosts: userData.feedPosts || [],
                colorPicker: '#000',
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
                        .oneOf([Yup.ref('password')], 'Passwords must match'),
                    feedPosts: Yup.array().of(Yup.object().shape(
                        {
                            id: Yup.number(),
                            body: Yup.string().required('Body is required')
                        }
                    )),
                    colorPicker: Yup.string().matches(colorRegex, "Invalid color")
                })
            }
            onSubmit={(values: ProfileFormValues,
                formikProps: FormikHelpers<ProfileFormValues>) => handleSubmitForm(values, formikProps)
            }
        >
            {({ values, setFieldValue }) => (
                <Form className='form'>
                    <label htmlFor="firstName">First Name</label>
                    <Field
                        className='form-item'
                        name="firstName"
                        type="text"
                        placeholder="Jane"
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <ErrorMessage className='error' name="firstName">{(msg) => <p>{msg}</p>}</ErrorMessage>
                    <Field
                        className='form-item'
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                    />
                    <ErrorMessage className='error' name="lastName">{(msg) => <p>{msg}</p>}</ErrorMessage>
                    <label htmlFor="email">Email</label>
                    <Field
                        className='form-item'
                        name="email"
                        type="email"
                        placeholder="jane@formik.com"
                    />
                    <ErrorMessage className='error' name="email">{(msg) => <p>{msg}</p>}</ErrorMessage>
                    <label htmlFor="password">Password</label>
                    <Field
                        className='form-item'
                        name="password"
                        type="password"
                        placeholder="your pass"
                    />
                    <ErrorMessage className='error' name="password">{(msg) => <p>{msg}</p>}</ErrorMessage>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <Field
                        className='form-item'
                        name="confirmPassword"
                        type="password"
                        placeholder="confirm your pass"
                    />
                    <ErrorMessage className='error' name="confirmPassword">{(msg) => <p>{msg}</p>}</ErrorMessage>
                    <label htmlFor="feedPosts">Posts</label>
                    <FieldArray name="feedPosts">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.feedPosts.length > 0 &&
                                    values.feedPosts.map((post, index) => (
                                        <div className="row" key={index}>
                                            <div className="col">
                                                <label htmlFor={`feedPosts.${index}.body`}>Body</label>
                                                <Field
                                                    className='form-item'
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
                    <label htmlFor="colorPicker">Posts</label>
                    <SketchPicker color={values['colorPicker']} onChange={(color, event) => {
                        setFieldValue('colorPicker', color.hex, true)
                        }} />
                    <ErrorMessage className='error' name="colorPicker">{(msg) => <p>{msg}</p>}</ErrorMessage>
                    <button type="submit">Submit</button>
                </Form>
            )
            }
        </Formik >
    )
}

export default ProfileUpdateForm