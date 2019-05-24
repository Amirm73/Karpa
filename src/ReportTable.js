// import React, { Component } from 'react'
// import formatSeconds from './utils/time'
// import { splitDays, getRange, toJalali} from './utils/history'
// import jalali from 'jalali-moment'
// import { getHistory } from './services/history'

// export default class ReportTable extends Component {

//   calcTotal ( day ) {
//     let total = 0
//     let l = day.length
//     l = l % 2 === 0 ? l : l - 1 
//     for ( let i = 0; i < l; i += 2 )
//       total += day[ i + 1 ] - day[ i ]
//     return total
//   }
  

//   // calcTotal ( day ) {
//   //   let total = 0
//   //   for ( let i = 0, l = day.length; i < l; i += 2 )
//   //     total += day[ i + 1 ] - day[ i ]
//   //   return total
//   // }
  
//   calcIncomp ( total, nhpd ) {
//     const inc = nhpd * 60 * 60 * 1000 - total
//     return inc < 0 ? 0 : inc
//   }
  
//   calcExtra ( total, nhpd ) {
//     const ext = total - nhpd * 60 * 60 * 1000
//     return ext < 0 ? 0 : ext
//   }
  
//   /**
//    * sph: Sallary per Hour
//    * nhpd: Normal Hour per Day
//    * spxh: Sallary per eXtra Hour
//    * inc: Incomplete (Hour)
//    * ext: Extra (Hour)
//    */
//   calcSallary = ( sph, nhpd, spxh, inc, ext ) => Math.ceil (
//     ( nhpd * sph ) -
//     ( inc * sph  ) +
//     ( ext * spxh )
//   )
  
//   render(){
//     const history = getHistory ()
//     history.sort( ( a, b ) => ( a - b ) )
//     history.forEach(d =>{
//       console.log( toJalali(d) )  
//     } )
//     const range = getRange ( history,this.props.startingDate, this.props.endingDate )
//     console.log("******************** getRange")
//     range.forEach( d =>{
//       console.log( toJalali(d) )  
//     } )
//     const days = splitDays ( range )
    
//     console.log(days, "******************** splitDays")
//     days.forEach( d =>{
//       console.log( toJalali(d[0]) )  
//     } )
//     // console.log( moment.startOf( this.props.startingDate ) )
//     return <table border="1">
//       <thead>
//         <tr>
//           <th>N.</th>
//           <th>Date</th>
//           <th>Total</th>
//           <th>Incomplete</th>
//           <th>Extra</th>
//           <th>Salary</th>
//         </tr>
//       </thead>
//       <tbody>
//         { days.map ( ( day, i ) => {
//           const total = this.calcTotal ( day )
//           // console.log( total )
//           const incomplete = this.calcIncomp ( total, this.props.nhpd )
//           const extra = this.calcExtra ( total, this.props.nhpd )
//           const sallary = this.calcSallary ( this.props.sph, this.props.nhpd, this.props.ext, incomplete/1000/60/60, extra/1000/60/60 )
//           return <tr key = { day[ 0 ] }>
//             <td>{ i + 1 }</td>
//             <td>{ jalali ( day[ 0 ] ).format ( 'jYYYY/jM/jD' ) }</td>
//             <td>{ formatSeconds ( Math.floor ( total / 1000 ) ) }</td>
//             <td>{ formatSeconds ( Math.floor ( incomplete / 1000 ) ) }</td>
//             <td>{ formatSeconds ( Math.floor ( extra / 1000 ) ) }</td>
//             <td>{ sallary } Tomans</td>
//           </tr>
//         } ) }
//       </tbody>
//     </table>
//   }
  
// }



import React from 'react'
import formatSeconds from './utils/time'
import { splitDays, getRange } from './utils/history'
import jalali from 'jalali-moment'
import { getHistory } from './services/history'


const ReportTable = ({ startingDate, endingDate }) => {
  const history = getHistory ()
  const range = getRange ( history, startingDate, endingDate )
  const days = splitDays ( range )
  // console.log ( history.map ( t => jalali ( t ).format ( 'YYYY/M/D' ) ) )
  console.log ( history.map ( t => ( new Date ( t ) ).getUTCDay () ) )
  return <table border="1">
    <thead>
      <tr>
        <th>N.</th>
        <th>Date</th>
        <th>Total</th>
        <th>Incomplete</th>
        <th>Extra</th>
        <th>Salary</th>
      </tr>
    </thead>
    <tbody>
      { days.map ( ( day, i ) => {
        const total = calcTotal ( day )
        const incomplete = calcIncomp ( total, 8 )
        const extra = calcExtra ( total, 8 )
        const sallary = calcSallary ( 12000, 8, 14000, incomplete/1000/60/60, extra/1000/60/60 )
        return <tr key = { day[ 0 ] }>
          <td>{ i + 1 }</td>
          <td>{ jalali ( day[ 0 ] ).format ( 'jYYYY/jM/jD' ) }</td>
          <td>{ formatSeconds ( Math.floor ( total / 1000 ) ) }</td>
          <td>{ formatSeconds ( Math.floor ( incomplete / 1000 ) ) }</td>
          <td>{ formatSeconds ( Math.floor ( extra / 1000 ) ) }</td>
          <td>{ sallary } Tomans</td>
        </tr>
      } ) }
    </tbody>
  </table>
}



function calcTotal ( day ) {
  let total = 0
  for ( let i = 0, l = day.length; i < l; i += 2 )
    total += day [ i + 1 ] - day [ i ]
  return total
}

function calcIncomp ( total, nhpd ) {
  const inc = nhpd * 60 * 60 * 1000 - total
  return inc < 0 ? 0 : inc
}

function calcExtra ( total, nhpd ) {
  const ext = total - nhpd * 60 * 60 * 1000
  return ext < 0 ? 0 : ext
}

/**
 * sph: Sallary per Hour
 * nhpd: Normal Hour per Day
 * spxh: Sallary per eXtra Hour
 * inc: Incomplete (Hour)
 * ext: Extra (Hour)
 */
const calcSallary = ( sph, nhpd, spxh, inc, ext ) => Math.ceil (
  ( nhpd * sph ) -
  ( inc * sph  ) +
  ( ext * spxh )
)

export default ReportTable


