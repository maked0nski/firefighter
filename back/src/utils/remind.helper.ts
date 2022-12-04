export function remind(date) {
    let delta =  new Date(date).getTime() - new Date().getTime();
    // console.log("delta", Math.floor(delta/1000/60/60/24))
    return Math.floor(delta/1000/60/60/24)
}