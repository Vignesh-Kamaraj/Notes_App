import React from 'react'
export const UserDataContext = React.createContext(null)
function UserContext({children}) {
    const API_URL=`${import.meta.env.VITE_API_URL}`
  return  <UserDataContext.Provider value={{API_URL}}>
  {children}
  </UserDataContext.Provider>
}

export default UserContext 