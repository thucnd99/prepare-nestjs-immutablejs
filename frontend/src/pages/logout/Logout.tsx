import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "../../redux/actions.creators/auth.action.creator"
// import { useDispatch } from "react-redux"
import { useAppDispatch } from "../../redux/hooks/hooks"

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
