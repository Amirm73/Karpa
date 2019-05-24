import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { initiateHistory } from './services/history'
// import styled, { css } from 'styled-components'
import jalali from 'jalali-moment'



// console.log ( jalali ( 0 ).format ( 'jYYYY/jM/jD hh:mm:ss' ) )


// initiateHistory ()

// ReactDOM.render (
//     <Router>
//         <App />
//     </Router>,
//     document.getElementById ( 'root' )
// )






// console.log ( css `width: 100px;` )

// const sizes = {
//     desktop: 992,
//     tablet: 768,
//     mobile: 576
// }

// const media = Object.keys ( sizes ).reduce ( ( acc, label ) => {
//     acc [ label ] = ( ...args ) => css `
//         @media ( min-width: ${ sizes [ label ] }px ) {
//             ${ css ( ...args ) }
//         }
//     `
//     return acc
// }, {} )

// // const media = {
//     // desktop: ( ...args ) => css `
//     //     @media ( min-width: 992px ) {
//     //         ${ css ( ...args ) }
//     //     }
//     // `,
// //     tablet: ( ...args ) => css `
// //         @media ( min-width: 768px ) {
// //             ${ css ( ...args ) }
// //         }
// //     `,
// //     mobile: ( ...args ) => css `
// //         @media ( min-width: 576px ) {
// //             ${ css ( ...args ) }
// //         }
// //     `
// // }


// const Gholam = styled.div `
//     background: grey;
//     ${ media.mobile `
//         background: green;
//     ` }
//     ${ media.tablet `
//         background: yellow;
//     ` }
//     ${ media.desktop `
//         background: red;
//     ` }
// `



// ReactDOM.render (
//     <Gholam>Silam</Gholam>,
//     document.getElementById ( 'root' )
// )



localStorage.clear ()
const rand = max => Math.floor ( Math.random () * max )
function enset ( arr ) {
    let newArr = []
    arr.forEach ( item => {
        if ( ! newArr.filter ( i => i === item ).length )
            newArr.push ( item )
    } )
    return newArr
}
function genRandomList ( roof, len ) {
    let list = []
    while ( list.length < len ) {
        const newRand = rand ( roof )
        list.push ( newRand )
        list = enset ( list )
    }
    return list
}
const getSortedRandomList = ( roof, len ) => genRandomList ( roof, len ).sort ( ( a, b ) => a - b )
let days = []
for ( let i = 0; i < 20; i ++ ) {
    const base = 1555286400000 + i * 24*60*60*1000
    days [ i ] = getSortedRandomList ( 24 * 60 * 60 * 1000, 16 ).map ( i => i + base )
}
// console.log ( "[" + days.flat ().toString () + "]" )
localStorage.setItem ( 'history', "[" + days.flat ().toString () + "]" )
