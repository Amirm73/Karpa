import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { pushNow, getHistory, timeOfDay } from './services/history'
import { getLastDay, toDate } from './utils/history'
import { formatSeconds } from './utils/time'


export default class Staff extends Component {

  componentDidMount () {
    const history = getHistory ()
    const lastDay = getLastDay ( history )
    const today = toDate( lastDay[ 0 ] )  === toDate( Date.now() ) ?  lastDay  : []
    const second = timeOfDay ( today )
    // const isRunning = lastDay.length % 2 !== 0
    // this.setState ({ time: second, isRunning })
    // if ( isRunning ) this.startTimer ()
  }

  state = {
    isRunning: false,
    time: 0
  }

  startTimer = () => {
    this.interval = setInterval ( () => {
      this.setState ( prevState => ({
        time: prevState.time + 1
      }) )
    }, 1000 );
  }

  stopTimer = () => {
    clearInterval ( this.interval )
  }

  tap = () => {
    ( this.state.isRunning ? this.stopTimer : this.startTimer ) ()
    this.setState ( prevState => ({ isRunning: ! prevState.isRunning }) )
    pushNow ()
  }

  render () { return <>
    <section className = 'staff-section'>
      <container className = 'timer-container' >
        <Timer time = { this.state.time } />
      </container>
      <button className = 'play-btn'
          onClick = { this.tap }
          children = { this.state.isRunning ? 'Stop' : 'Start' }
        />
      <Link to = '/login'  className = 'login-btn' >Login</Link>
    </section>
   
  </> }

}


const Timer = ({ time }) => <p
  className = 'timer-presenter'
  children = { formatSeconds ( time ) }
/>
