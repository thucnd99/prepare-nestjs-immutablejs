import React from "react"
import { Formik, FormikHelpers, FieldArray, Form } from "formik"
import * as Yup from "yup";
import { FeedPost } from "../../models/post.interface";
import { useMutation, useQueryClient } from "react-query";
import { updateProfile } from "../../services/auth.service";
import CustomButton from "../../themes/CustomButton";
import CustomFormLabel from "../../themes/CustomFormLabel";
import FormField from "../form.field/FormField";
import { UpdateUser } from "../../models/user/update.user.interface";
import { InputTypes } from "../form.field/InputType";
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
const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

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
    confirmPassword: Yup.string().when('password', (password, schema) => {
        if (password[0])
            return schema.required('Remember confirm password').oneOf([Yup.ref('password')], 'Passwords must match')
        return schema
    }),
    feedPosts: Yup.array().of(Yup.object().shape(
        {
            id: Yup.number(),
            body: Yup.string().required('Body is required')
        }
    )),
    colorPicker: Yup.string().matches(colorRegex, "Invalid color")
})
const RQProfileUpdateForm: React.FC<ProfileProps> = (props: ProfileProps) => {
    const userData = props.user
    const queryClient = useQueryClient()
    const updateFormMutation = useMutation(updateProfile, {
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries('view-profile')
        },
        onError(error, variables, context) {
            console.log(error)
        },
    })
    const initialValues: ProfileFormValues = {
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
                    <FormField displayRequired={true} label="First Name" name="firstName" control={InputTypes.TEXT} type="text" placeholder="Jane" />
                    <FormField displayRequired={true} label="Last Name" name="lastName" control={InputTypes.TEXT} type="text" placeholder="Doe" />
                    <FormField displayRequired={true} label="Email" name="email" control={InputTypes.EMAIL} type="email" placeholder="jane@formik.com" />
                    <FormField label="Password" name="password" control={InputTypes.PASSWORD} type="password" placeholder="your pass" />
                    <FormField label="Confirm password" name="confirmPassword" control={InputTypes.PASSWORD} type="password" placeholder="your pass" />
                    <CustomFormLabel htmlFor="feedPosts">Posts</CustomFormLabel>
                    <FieldArray name="feedPosts">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.feedPosts.length > 0 &&
                                    values.feedPosts.map((post, index) => (
                                        <div className="row" key={index}>
                                            <FormField displayRequired={true}
                                                label="Body"
                                                name={`feedPosts.${index}.body`}
                                                placeholder="Jane Doe"
                                                control={InputTypes.TEXTAREA}
                                                type="textarea"
                                                extra={<CustomButton
                                                    color="red"
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                >
                                                    X
                                                </CustomButton>}
                                            />
                                        </div>
                                    ))}

                                <CustomButton
                                    color="mediumseagreen"
                                    type="button"
                                    onClick={() => push({ body: '' })}
                                >
                                    Add Post
                                </CustomButton>

                            </div>
                        )}
                    </FieldArray>
                    <FormField displayRequired={true} label="Color Picker" name="colorPicker" control={InputTypes.COLORPICKER} type="text" />
                    <div>
                        <CustomButton color='mediumseagreen' type="submit" >Submit</CustomButton>
                    </div>
                </Form>
            )
            }
        </Formik >
    )
}

export default RQProfileUpdateForm