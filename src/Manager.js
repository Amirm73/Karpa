/** 
 * from jalali to moment:
 * Manager.js : changeDay, changeMonth, changeYear
 * ReportTable.js : line 31 
*/
import React, { Component } from 'react'
import { Link} from 'react-router-dom'
import { LoggedOut } from './services/auth'
import Setting from './Setting'
import Report  from './Report'
import { changeDay, changeMonth, changeYear } from './services/history'
import jalali from 'jalali-moment'
import { getLocal } from './services/salary'

const salaryEnums = {
  normalHours  : "normalHours",
  normalSalary : "normalSalary",
  extraSalary  : "extraSalary"  
}

export default class Manager extends Component {
  constructor(props){
    super(props)
    this.handleDayChange   = this.handleDayChange.bind( this )
    this.handleMonthChange = this.handleMonthChange.bind( this )
    this.handleYearChange  = this.handleYearChange.bind( this )
    this.handleSettingChange = this.handleSettingChange.bind( this )
    const now = Date.now ()
    this.state = {
      startingDate: now - 2592000000, //one month ago
      endingDate :  now,
      normalHours  : getLocal( salaryEnums.normalHours  ),
      normalSalary : getLocal( salaryEnums.normalSalary ),
      extraSalary  : getLocal( salaryEnums.extraSalary  )
    }
  }

  handleDayChange( e ) {
    const state = e.target.name 
    const day = Number( e.target.value )
    this.setState( prevState => ({ 
      [ state ] : changeDay( 
        jalali( prevState[ state ] ).locale('fa'), day
      )
    }) )
  }

  handleMonthChange( e ) {
    const state = e.target.name
    const month = Number( e.target.value ) - 1 //moment month, from 0 to 11
    this.setState( prevState => ({ 
      [ state ] : changeMonth ( 
        jalali( prevState[ state ] ).locale('fa'), month
      )
    }) )
  }
  
  handleYearChange( e ) {
    const state = e.target.name
    const year = Number( e.target.value ) 
    this.setState( prevState => ({ 
      [ state ] : changeYear(
        jalali( prevState[ state ] ).locale('fa'), year
      )
    }) )
  }

  handleSettingChange( e ) {
    this.setState({ [ e.target.name ] : e.target.value })
    localStorage.setItem( e.target.name , e.target.value )
  }

  render() {
    return <>
      <section className = 'dash-section' >
        <div className = 'setting-container' ><Setting 
          normalHours  = { this.state.normalHours  } 
          normalSalary = { this.state.normalSalary }
          extraSalary  = { this.state.extraSalary  }
          handleSettingChange = {this.handleSettingChange }
        /></div>
        <br />
        <br /> 
        <div className = 'report-container'><Report
          startingDate = { this.state.startingDate }
          endingDate = { this.state.endingDate }
          handleDayChange = { this.handleDayChange }
          handleMonthChange = { this.handleMonthChange }
          handleYearChange = { this.handleYearChange }
          nhpd = { this.state.normalHours }
          sph = { this.state.normalSalary }
          ext = { this.state.extraSalary }
        /></div>
        
        <div className = 'logout-btn'>
          <Link to = '/' >
            <button onClick = { LoggedOut } > Logout </button>
          </Link>
        </div>
      </section>
    </>
  }
}
  