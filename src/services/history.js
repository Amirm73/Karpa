import jalali from 'jalali-moment'
import { toDate } from '../utils/history'
const STORAGE_KEY = 'history'


export const stampEnums = {
    start : "startingDate" , end : "endingDate"
}
export const initiateHistory = () => {
    if ( getHistory () )
        return
    setHistory ([])
}


export const getHistory = () => JSON.parse ( localStorage.getItem( STORAGE_KEY ) )

const setHistory = h => {
    localStorage.setItem ( STORAGE_KEY, JSON.stringify ( h ) )
}


export const pushHistory = time => {
    const prevHistory = getHistory ()
    setHistory ( [ ...prevHistory, time ] )
}

export const pushNow = () => {
    const time = Date.now ()
    pushHistory ( time )
}
  
export const makeDatePairs = ( [ startDate, endDate ] ) => {
    return [ 
            [ stampEnums.start, startDate ],
            [ stampEnums.end,   endDate   ],
    ]
}
  

export const searchFromRecentDates = ( searchedTstamp, tStampWork ) => {
    const searched = toDate( searchedTstamp )
    for (let i = 0; i < tStampWork.length ; i++ ){ 
        if ( toDate( tStampWork[ i ][ 0 ] ) === 
             toDate( searched )
        ) return i 
    }   
    return false
}

export const slicedResult = ( firstIndex = 0 , lastIndex , tStampWork ) => {
     lastIndex = lastIndex ? lastIndex : tStampWork.length
    return tStampWork.slice( firstIndex , lastIndex + 1  )
}

export const searchDates = ( firstDate, lastDate, tStampWork ) => {
    const firstIndex = searchFromRecentDates( firstDate, tStampWork )
    const lastIndex  = searchFromRecentDates( lastDate, tStampWork )
    return slicedResult( firstIndex, lastIndex, tStampWork )
}


export const changeDay =  ( moment, day ) => {
    return makeTstamp( moment.year(), moment.month() +1 , day )
}
export const changeMonth =  ( moment, month ) => {
    return makeTstamp( moment.year(), month + 1 , moment.date() )
}
export const changeYear =  ( moment, year ) => {
    return makeTstamp( year, moment.month() + 1 , moment.date() )
}

const makeTstamp= ( year, month, day ) => {
    const jal =  jalali( `${year}/${month}/${day}`, 'jYYYY/jM/jD')
    return jal.valueOf()   
}

// export const workPerDays = days => {
//     let dayWork = []
//     let work = []
//     for( let i in days ){
//         // for everyday, first timestamp and sum of done work 
//         dayWork = [  days[ i ][ 0 ] , timeOfDay( days[ i ] ) ]
//         work.push( dayWork )
//     } 
//     return work
// }

export const timeOfDay =  day => {
    let passedTime = 0
    let sec = 0
    for ( let i = 0, l = day.length; i < l; i += 2 ){
        passedTime += ( day[ i + 1 ] || Date.now () ) - day[ i ] 
    }
    sec = Math.floor( passedTime /1000 )
    return sec
}

export default searchDates