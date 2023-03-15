import React from "react"
import { User } from "../../models/user.interface"
import { Formik, FormikHelpers, ErrorMessage, FieldArray } from "formik"
import * as Yup from "yup";
import { FeedPost } from "../../models/post.interface";
import { SketchPicker } from 'react-color';
import { useMutation, useQueryClient } from "react-query";
import { updateProfile } from "../../services/auth.service";
import CustomButton from "../../themes/CustomButton";
import CustomFormikField from "../../themes/CustomFormItem";
import CustomFormLabel from "../../themes/CustomFormLabel";
import { Form } from "antd";
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

const RQProfileUpdateForm: React.FC<ProfileProps> = (props: ProfileProps) => {
    const userData = props.user
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    const queryClient = useQueryClient()
    const updateFormMutation = useMutation(updateProfile, {
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries('view-profile')
        },
        onError(error, variables, context) {
            console.log(error)
        },
    })
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
        updateFormMutation.mutate(data);
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
                <Form className="form">
                    <CustomFormLabel aria-required={true} htmlFor="firstName">First Name</CustomFormLabel>
                    <CustomFormikField
                        name="firstName"
                        type="text"
                        placeholder="Jane"
                    />
                    <ErrorMessage name="firstName">{(msg) => <p  className='error'>{msg}</p>}</ErrorMessage>
                    <CustomFormLabel aria-required={true} htmlFor="lastName">Last Name</CustomFormLabel>
                    <CustomFormikField
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                    />
                    <ErrorMessage name="lastName">{(msg) => <p  className='error'>{msg}</p>}</ErrorMessage>
                    <CustomFormLabel aria-required={true} htmlFor="email">Email</CustomFormLabel>
                    <CustomFormikField
                        name="email"
                        type="email"
                        placeholder="jane@formik.com"
                    />
                    <ErrorMessage name="email">{(msg) => <p className='error'>{msg}</p>}</ErrorMessage>
                    <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                    <CustomFormikField
                        name="password"
                        type="password"
                        placeholder="your pass"
                    />
                    <ErrorMessage name="password">{(msg) => <p className='error'>{msg}</p>}</ErrorMessage>
                    <CustomFormLabel htmlFor="confirmPassword">Confirm password</CustomFormLabel>
                    <CustomFormikField
                        name="confirmPassword"
                        type="password"
                        placeholder="confirm your pass"
                    />
                    <ErrorMessage name="confirmPassword">{(msg) => <p className='error'>{msg}</p>}</ErrorMessage>
                    <CustomFormLabel htmlFor="feedPosts">Posts</CustomFormLabel>
                    <FieldArray name="feedPosts">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.feedPosts.length > 0 &&
                                    values.feedPosts.map((post, index) => (
                                        <div className="row" key={index}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                                <CustomFormLabel aria-required={true} htmlFor={`feedPosts.${index}.body`}>Body</CustomFormLabel>
                                                <CustomButton
                                                    color="red"
                                                    htmlType="button"
                                                    onClick={() => remove(index)}
                                                >
                                                    X
                                                </CustomButton>
                                            </div>
                                            <CustomFormikField
                                                name={`feedPosts.${index}.body`}
                                                placeholder="Jane Doe"
                                                type="text"
                                            />
                                            <ErrorMessage
                                                className='error'
                                                name={`feedPosts.${index}.body`}
                                                component="div"
                                            />
                                        </div>
                                    ))}
                                <CustomButton
                                    color="mediumseagreen"
                                    htmlType="button"
                                    onClick={() => push({ body: '' })}
                                >
                                    Add Post
                                </CustomButton>
                            </div>
                        )}
                    </FieldArray>
                    <CustomFormLabel aria-required={true} htmlFor="colorPicker">Color Picker</CustomFormLabel>
                    <SketchPicker color={values['colorPicker']} onChange={(color, event) => {
                        setFieldValue('colorPicker', color.hex, true)
                    }} />
                    <ErrorMessage className='error' name="colorPicker"/>
                    <CustomButton color='mediumseagreen' htmlType="submit" >Submit</CustomButton>

                </Form>
            )
            }
        </Formik >
    )
}

export default RQProfileUpdateForm