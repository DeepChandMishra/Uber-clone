import React, { createContext, useState } from 'react'

export const UserDataContext=createContext();

export const UserContext = ({children}) => {

  const [user,setUser]=useState({
    email:'',
    name:{
      firstName:'',
      lastName:''
    }
  })
  return (
    <div>
      <UserDataContext.Provider value={{user,setUser}}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}
