import React, { useEffect } from "react"
import { useAppDispatch } from "../../hooks/hooks"
import { useNavigate } from "react-router-dom"
import { logout } from "../../redux/actions/auth.actions"
import { setToken } from "../../services/auth.service"

const RQLogout = () => {
  //maybe
  const navigate = useNavigate()
  useEffect(() => {
    setToken('')
    navigate("/")
  }, [navigate])
  return (<>Logout...</>)
}

export default RQLogout;
