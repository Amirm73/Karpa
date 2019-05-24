import React, { Component } from 'react'
import { jalaliSplitTstamp } from './utils/history'
import { stampEnums } from './services/history'
import ReportTable from './ReportTable'

export class Report extends Component {
    constructor( props ){
      super( props )
      this.showOption = this.showOption.bind( this )
    }

    
    showOption( begin, end ) {
      let options = []
      for( let i = begin; i <= end; i++ )
        options.push( i )
      return options.map( item => <option key = { item } value = { item }> { item } </option>)
    }
    render() {
      let [ sYear, sMonth, sDay ] = jalaliSplitTstamp( this.props.startingDate )
      let [ eYear, eMonth, eDay ] = jalaliSplitTstamp( this.props.endingDate )
      sYear = Number( sYear )
      eYear = Number( eYear )
      return <>
      <h3>Report</h3>
      <form onSubmit = { this.props.handleReport }>
        <label>
          Enter the starting date:

          <select name  = { stampEnums.start }
            value = { sYear }
            onChange = { this.props.handleYearChange  } 
          >
            { this.showOption( sYear - 5, sYear + 5  ) }
          </select>

          <select name  = { stampEnums.start }
            value = { sMonth }
            onChange = { this.props.handleMonthChange  } 
          >
            { this.showOption( 1, 12 ) }
          </select>

          <select name  = { stampEnums.start }
            value = { sDay }
            onChange = { this.props.handleDayChange } 
          >
            { this.showOption( 1, 31 ) }
          </select>
          
        </label>
        <br />
  
        
        <label>
          Enter the ending date: 
          <select name  = { stampEnums.end }
            value = { eYear }
            onChange = { this.props.handleYearChange  } 
          >
            { this.showOption(  eYear - 5, eYear + 5 ) }
          </select>

          <select name  = { stampEnums.end }
            value = { eMonth }
            onChange = { this.props.handleMonthChange  } 
          >
            { this.showOption( 1, 12 ) }
          </select>

           <select name  = { stampEnums.end }
            value = { eDay }
            onChange = { this.props.handleDayChange  } 
          >
            { this.showOption( 1, 31 ) }
          </select>
        </label>
        <br/>
      </form>
      <br />
      <ReportTable
        startingDate = { this.props.startingDate }
        endingDate   = { this.props.endingDate   }
        nhpd = { this.props.nhpd }
        sph = { this.props.sph }
        ext = { this.props.ext }
      />
    </>    
  }
}
export default Report


// const ReportTable = ({ startingDate, endingDate }) => {
//   const history = getHistory ()
//   const range = getRange ( history, startingDate, endingDate )
//   const days = splitDays ( range )
//   return <table border="1">
//     <thead>
//       <tr>
//         <th>N.</th>
//         <th>Date</th>
//         <th>Total</th>
//         <th>Incomplete</th>
//         <th>Extra</th>
//         <th>Salary</th>
//       </tr>
//     </thead>
//     <tbody>
//       { days.map ( ( day, i ) => {
//         const total = calcTotal ( day )
//         const incomplete = calcIncomp ( total, 8 )
//         const extra = calcExtra ( total, 8 )
//         const sallary = calcSallary ( 12000, 8, 14000, incomplete/1000/60/60, extra/1000/60/60 )
//         return <tr key = { day [ 0 ] }>
//           <td>{ i + 1 }</td>
//           <td>{ jalali ( day [ 0 ] ).format ( 'jYYYY/jM/jD' ) }</td>
//           <td>{ formatSeconds ( Math.floor ( total / 1000 ) ) }</td>
//           <td>{ formatSeconds ( Math.floor ( incomplete / 1000 ) ) }</td>
//           <td>{ formatSeconds ( Math.floor ( extra / 1000 ) ) }</td>
//           <td>{ sallary } Tomans</td>
//         </tr>
//       } ) }
//     </tbody>
//   </table>
// }



// function calcTotal ( day ) {
//   let total = 0
//   for ( let i = 0, l = day.length; i < l; i += 2 )
//     total += day [ i + 1 ] - day [ i ]
//   return total
// }

// function calcIncomp ( total, nhpd ) {
//   const inc = nhpd * 60 * 60 * 1000 - total
//   return inc < 0 ? 0 : inc
// }

// function calcExtra ( total, nhpd ) {
//   const ext = total - nhpd * 60 * 60 * 1000
//   return ext < 0 ? 0 : ext
// }

// /**
//  * sph: Sallary per Hour
//  * nhpd: Normal Hour per Day
//  * spxh: Sallary per eXtra Hour
//  * inc: Incomplete (Hour)
//  * ext: Extra (Hour)
//  */
// const calcSallary = ( sph, nhpd, spxh, inc, ext ) => Math.ceil (
//   ( nhpd * sph ) -
//   ( inc * sph  ) +
//   ( ext * spxh )
// )
