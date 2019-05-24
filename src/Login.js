import React, { Component } from 'react'
import { checkUserPass, LoggedIn } from './services/auth'

export class Login extends Component {
    constructor( props ) { 
      super( props )
      this.handleAuth   = this.handleAuth.bind( this )
      this.handleChange = this.handleChange.bind( this )
      this.handleSubmit  = this.handleSubmit.bind( this )
    }
    state = {
      user: '',
      pass: ''
    }
    
    handleAuth () {
      console.log( checkUserPass( this.state.user, this.state.pass ) )
      checkUserPass( this.state.user, this.state.pass ) && LoggedIn()  
    }

    handleChange( e ) {
      this.setState({ [ e.target.name ] : e.target.value })
    }
  
  
    handleSubmit( e ) { 
        e.preventDefault()
        this.handleAuth()
        this.props.history.push ( '/dash' )
    }
    
    
    render() {
      return <>
        <section  className = "form-section">
        <div className = "form-feild">
          <form  onSubmit = { this.handleSubmit }>
            
              <label>
                Username : 
                <input 
                    name = "user"
                    type = "text"
                    value = { this.state.user }
                    onChange = { this.handleChange }
                  />
              </label>
            
            <br />
              <label>
                Password : 
                <input
                    name = "pass"
                    type = "password"
                    value = { this.state.pass }
                    onChange = { this.handleChange }
                  />
              </label>
            <br />
            <input className = "submit-btn" type = "submit" />
          </form>
          </div>
        </section>
      </>
    }
  }
  
  
export default Login
