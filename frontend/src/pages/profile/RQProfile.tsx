import React, { useEffect, useState } from "react"
import { Button, Modal, Typography } from "antd"
import { useQuery } from "react-query";
import { viewProfile } from "../../services/auth.service";
import RQProfileUpdateForm from "../../components/profile.update.form/RQ.ProfileUpdateForm";
import Loading from "../../components/loading/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const { Paragraph } = Typography;
const RQProfile: React.FC = () => {
    const { isLoading, isError, data, error } = useQuery('view-profile', viewProfile)
    const user = data?.data
    const [open, setOpen] = useState(false);
    const isLoggedIn = useSelector((state:RootState) => state.auth.isLoggedIn)
    const navigate = useNavigate()
    useEffect(() => {
        if (isLoggedIn === null) {
            navigate("/login")
        }
    }, [navigate, isLoggedIn]);
    const content = () => {
        if (isLoading)
            return <Loading size="large" />
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
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
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