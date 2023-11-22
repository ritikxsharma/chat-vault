import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    useEffect(() => {
      if(!user){
        navigate('/')
      }
    }, [])
  return (
    <div>
      Welcome, {user?.phoneNumber}
    </div>
  )
}

export default Dashboard