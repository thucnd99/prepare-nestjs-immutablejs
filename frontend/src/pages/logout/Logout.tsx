import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "../../redux/actions.creators/auth.action.creator"
import { useDispatch } from "react-redux"

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch<any>(logout())
        navigate("/")
      }, [dispatch, navigate])
    return (<>Logout...</>)
}

export default Logout;
