
export const calcIncomplete = done => {
    const inc = getLocal( "normalHours" ) * 3600 - done 
    return inc > 0 ? inc : 0
}
export const calcExtra = done => {
    const ex = done - getLocal( "normalHours" ) * 3600  
    return ex > 0 ? ex : 0
}

export const calcSalary = ( inc, extra ) => {
    const normHours  = getLocal( "normalHours" )
    const normSalary = getLocal( "normalSalary" )
    const exSalary   = getLocal( "extraSalary")
    let salary = ( normHours - inc / 3600 ) * normSalary + 
        extra / 3600 * exSalary
        salary = Number.parseFloat( salary ).toFixed( 0 )
    return salary
}

export const getLocal = item => JSON.parse ( localStorage.getItem( item ) )

export const setLocal = ( key, value ) => localStorage.setItem( key, value )

export const setTimestamp = ( key, value ) => localStorage.setItem( key, value )