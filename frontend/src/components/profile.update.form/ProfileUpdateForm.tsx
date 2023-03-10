import React from "react"
import { User } from "../../models/user.interface"
interface ProfileProps {
    user: User
    // many many
}
const ProfileUpdateForm:React.FC<ProfileProps> = (props: ProfileProps) => {
    const userData = props.user
    return (
        <></>
    )
}

export default ProfileUpdateForm