import React, { useEffect } from "react"
import { useAppDispatch } from "../../hooks/hooks"
import { useNavigate } from "react-router-dom"
import { logout } from "../../redux/actions/auth.actions"

const RQLogout = () => {
    //maybe
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/")
      }, [navigate])
    return (<>Logout...</>)
}

export default RQLogout;
