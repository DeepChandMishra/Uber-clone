import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    debugger;
    const token= localStorage.getItem('token');
    const navigate=useNavigate();
    axios.get(`${import.meta.env.VITE_API_URL}/users/logout`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status === 200){
            console.log(response.status);
            
            localStorage.removeItem('token');
            navigate('/login')
        }
    })
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout
