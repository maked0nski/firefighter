export function remind(date) {
    let delta =  new Date(date).getTime() - new Date().getTime();
    return Math.floor(delta/1000/60/60/24)
}

export function timeCalc(date: string) {
    let moment = require('moment');
    return moment(date).locale("uk").endOf('day').fromNow()
}
