export function parseSeconds ( seconds ) {
    const hr = Math.floor ( seconds / 3600 );
    let r = seconds % 3600;
    const min = Math.floor ( r / 60 );
    r = r % 60;
    const sec = r;
    return { hr, min, sec };
}

export const formatDigit = d => d < 10 ? '0' + d : d.toString ();

export function formatTime ( time ) {
    const formattedTime = {};
    for ( let key in time )
        formattedTime[key] = formatDigit ( time[key] );
    const { hr, min, sec } = formattedTime;
    return `${ hr }:${ min }:${ sec }`;
}

export const formatSeconds = sec => formatTime ( parseSeconds ( sec ) )
export default formatSeconds
