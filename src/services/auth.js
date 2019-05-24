const USERNAME = "admin"
const PASSWORD = "123"

export const checkUserPass = ( u, p ) => USERNAME === u && PASSWORD === p

export const LoggedIn  = () => sessionStorage.setItem( "log", true )

export const LoggedOut = () => sessionStorage.setItem( "log", false )

export const checkLog  = () => sessionStorage.getItem( "log" )