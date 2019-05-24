import moment from 'moment'
import jalali from 'jalali-moment'
import formatSeconds from './time';

export const getLastDay = history => {
    const l = history.length
    const last = history[ l - 1 ]
    const formattedLast = toDate( last )
    // const formattedLast = moment ( last ).format ( 'MMMM Do YYYY' )
    let today = []
    for ( let i = l - 1; i >= 0; i -- ) {
        const current = history[ i ]
        if (
            formattedLast ===
            toDate( current )
        )
            today = [ current, ...today ]
        else break
    }
    return today
}

export const SplitTstamp = tstamp => {
    return moment ( tstamp ).format ( 'YYYY/M/D' ).split ( '/' )
}

export const jalaliSplitTstamp = tstamp => {
    return jalali ( tstamp ).format ( 'jYYYY/jM/jD' ).split ( '/' )
}

const getDayBeggining = ts => ts - Math.floor ( ts % ( 24*60*60*1000 ) )

export const splitDays = history => {
    if ( ! history.length ) return []
    const firstDay = getDayBeggining ( history[ 0 ] )
    const days = []
    history.forEach ( item => {
        const i = Math.floor ( ( item - firstDay ) / (24*60*60*1000) )
        if ( ! days[ i ] )
            days[ i ] = []
        days[ i ].push ( item )
    } )
    return days
}

// export const splitDays = h => {
//     let history = h
//     if ( ! history.length ) return []
//     let days = []
//     while( history.length ){
//         const last = getLastDay( history )
//         days = [ last, ...days ]
//         history = history.slice( 0, history.length - last.length )
//     }
//     return days
// }



export const toDate = tstamp => moment( tstamp ).format ('YYYY/MM/DD') 

export const toJalali = tstamp => jalali( tstamp ).format( 'jYYYY/jM/jD' )

export const lastMilisecOfDay = tstamp => {
        const r = tstamp % 24*60*60*1000
        return tstamp + r - 1
    }
export const fisrtMilisecOf = tstamp => {
    const { year, month, day } =  moment( tstamp )
    return moment ( year, month, day).valueOf()
}

// export const fisrtMilisecOf = tstamp => {
//     const r = tstamp % 24*60*60*1000
//     return tstamp - r + 1
// }
// export function getRange ( history, startingDate, endingDate ) {
//     let startingIndex, endingIndex
//     // const startingDatelast = lastMilisecOfDay( startingDate ) 
//     // const endingDatefirst = fisrtMilisecOf( endingDate )
//     for ( let i = 0, l = history.length; i < l; i ++ )
//       if ( history[ i ] >= startingDate ) {
//         startingIndex = i
//         break
//       }
//     for ( let i = history.length - 1 ; i >= 0; i -- )
//       if ( history[ i ] <= endingDate ) {
//         endingIndex = i
//         break
//       }
//     return history.slice ( startingIndex, endingIndex )
// }

export function getRange ( history, startingDate, endingDate ) {
    let startingIndex, endingIndex
    for ( let i = 0, l = history.length; i < l; i ++ )
      if ( history[ i ] >= startingDate ) {
        startingIndex = i
        break
      }
    for ( let i = history.length - 1; i >= 0; i -- )
      if ( history[ i ] <= endingDate ) {
        endingIndex = i
        break
      }
    return history.slice ( startingIndex, endingIndex + 1 )
}


export default formatSeconds