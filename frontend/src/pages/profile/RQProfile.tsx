import React, { useState } from "react"
import { Button, Modal, Typography } from "antd"
import ProfileUpdateForm from "../../components/profile.update.form/ProfileUpdateForm";
import { useQuery } from "react-query";
import { viewProfile } from "../../services/auth.service";
import RQProfileUpdateForm from "../../components/profile.update.form/RQ.ProfileUpdateForm";

const { Title, Paragraph, Text, Link } = Typography;
const RQProfile: React.FC = () => {
    const { isLoading, isError, data, error } = useQuery('view-profile', viewProfile)
    const user = data?.data
    const [open, setOpen] = useState(false);
    const content = () => {
        if (isLoading)
            return <>Loading...</>
        else if (isError) {
            console.log(error)
            return <>Something went wrong...</>
        }
        else return <>
            <Button type="primary" onClick={openUpdateProfileForm}>
                Update profile
            </Button>
            <Paragraph>{user.firstName}</Paragraph>
            <Paragraph>{user.lastName}</Paragraph>
            <Paragraph>{user.email}</Paragraph>
            <Modal
                title="Update profile"
                open={open}
                onOk={(e) => setOpen(false)}
                onCancel={(e) => setOpen(false)}
            >
                <RQProfileUpdateForm user={user} />
            </Modal>
        </>

    }
    const openUpdateProfileForm = () => {
        setOpen(true);
    };
    return (<>
        {content()}
    </>)
}

export default RQProfile;