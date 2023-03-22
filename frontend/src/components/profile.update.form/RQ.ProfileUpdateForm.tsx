import React from "react"
import { User } from "../../models/user/user.interface"
import { Formik, FormikHelpers, FieldArray, Field, Form } from "formik"
import * as Yup from "yup";
import { FeedPost } from "../../models/post.interface";
import { useMutation, useQueryClient } from "react-query";
import { updateProfile } from "../../services/auth.service";
import CustomButton from "../../themes/CustomButton";
import CustomFormLabel from "../../themes/CustomFormLabel";
import FormField from "../form.field/FormField";
import { UpdateUser } from "../../models/user/update.user.interface";
interface ProfileProps {
    user: UpdateUser
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
    const initialValues = {
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        password: '',
        confirmPassword: '',
        feedPosts: userData.feedPosts || [],
        colorPicker: '#000',
    };
    const handleSubmitForm = (values: ProfileFormValues,
        formikProps: FormikHelpers<ProfileFormValues>) => {
        const { setSubmitting } = formikProps;
        const data: UpdateUser = {
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
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validate}
            onSubmit={(values: ProfileFormValues,
                formikProps: FormikHelpers<ProfileFormValues>) => handleSubmitForm(values, formikProps)
            }
        >
            {({ values }) => (
                <Form className="form">
                    <Field required={true} label="First Name" name="firstName" type="text" placeholder="Jane" component={FormField} />
                    <Field required={true} label="Last Name" name="lastName" type="text" placeholder="Doe" component={FormField} />
                    <Field required={true} label="Email" name="email" type="email" placeholder="jane@formik.com" component={FormField} />
                    <Field label="Password" name="password" type="password" placeholder="your pass" component={FormField} />
                    <Field label="Confirm password" name="confirmPassword" type="password" placeholder="your pass" component={FormField} />
                    <CustomFormLabel htmlFor="feedPosts">Posts</CustomFormLabel>
                    <FieldArray name="feedPosts">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.feedPosts.length > 0 &&
                                    values.feedPosts.map((post, index) => (
                                        <div className="row" key={index}>
                                            <Field required={true}
                                                label="Body"
                                                name={`feedPosts.${index}.body`}
                                                placeholder="Jane Doe"
                                                type="text"
                                                component={FormField}
                                                extra={<CustomButton
                                                    color="red"
                                                    htmlType="button"
                                                    onClick={() => remove(index)}
                                                >
                                                    X
                                                </CustomButton>}
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
                    <Field required={true} label="Color Picker" name="colorPicker" type="colorPicker" component={FormField} />
                    <div>
                        <CustomButton color='mediumseagreen' htmlType="submit" >Submit</CustomButton>
                    </div>
                </Form>
            )
            }
        </Formik >
    )
}

export default RQProfileUpdateForm