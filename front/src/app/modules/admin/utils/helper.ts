export function timeCalc(date: string) {
    let moment = require('moment');
    return moment(date).locale("uk").endOf('day').fromNow()
}