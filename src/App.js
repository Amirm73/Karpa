import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import StaffComponent from './Staff'
import LoginComponent from './Login'
import ManagerComponent from './Manager'
import { checkLog } from './services/auth'



const App = () => <Switch>
  <Route exact path = '/' component = { StaffComponent }   />
  <Route path = '/login'  component = { LoginComponent }   />
  <Route path = '/dash'   component = { ProtectedComponent } />
</Switch>
export default App


const ProtectedComponent = () => {
  if ( checkLog() ){
    return < ManagerComponent /> 
  }
  return <Redirect to = '/login' />
}

// handleLink () {
//  return hasloggedIn() ? "/setting" : "/setting_login"
// }