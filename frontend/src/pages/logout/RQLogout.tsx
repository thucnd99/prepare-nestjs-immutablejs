import React, { useEffect } from "react"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { logout } from "../../services/auth.service"

const RQLogout = () => {
  //maybe
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  useEffect(() => {
    queryClient.removeQueries('view-profile')
    logout()
    queryClient.invalidateQueries('get-current');
    navigate("/")
  }, [navigate, queryClient])
  return (<>Logout...</>)
}

export default RQLogout;
