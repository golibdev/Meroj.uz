export const isAuthentification = (token) => {
   if (!token) {
      return false
   }
}

export const logout = (navigate) => {
   localStorage.clear()
   navigate('/')
}