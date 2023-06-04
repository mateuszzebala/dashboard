export const toBoolStr = (variable) => {
    return variable ? 'a' : ''
}
export const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i)
}
export const datetimeToString = (datetime) => {
    let { year, month, day, hour, minute, second } = datetime
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    if (hour < 10) hour = '0' + hour
    if (minute < 10) minute = '0' + minute
    if (second < 10) second = '0' + second

    return `${year}.${month}.${day} ${hour}:${minute}:${second}`
}
