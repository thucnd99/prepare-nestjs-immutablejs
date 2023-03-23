import React, { useEffect } from "react"
import { useAppDispatch } from "../../hooks/hooks"
import { useNavigate } from "react-router-dom"
import { logout } from "../../redux.toolkit/actions/auth.actions"

const Logout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(logout())
        navigate("/")
      }, [dispatch, navigate])
    return (<>Logout...</>)
}

export default Logout;
