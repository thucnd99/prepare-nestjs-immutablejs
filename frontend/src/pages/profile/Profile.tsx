import React, { useEffect, useState } from "react"
import { Button, Modal, Typography } from "antd"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { viewProfile } from "../../redux/actions/auth.actions";
import ProfileUpdateForm from "../../components/profile.update.form/ProfileUpdateForm";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text, Link } = Typography;
const Profile: React.FC = () => {
    const user = useAppSelector((state) => state.auth.currentUser)
    const token = useAppSelector((state) => state.auth.token)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(viewProfile())
    }, [dispatch])
    useEffect(() => {
        if (token === null) {
            navigate("/login")
        }
    }, [navigate, token]);
    const openUpdateProfileForm = () => {
        setOpen(true);
    };
    return (<>
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
            <ProfileUpdateForm user={user} />
        </Modal>
    </>)
}

export default Profile;