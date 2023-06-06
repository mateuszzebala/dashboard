export const toBoolStr = (variable) => {
    return variable ? '1' : ''
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

export const dateToString = (datetime) => {
    let { year, month, day } = datetime
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day

    return `${year}.${month}.${day}`
}
export const timeToString = (datetime) => {
    let { hour, minute, second } = datetime
    if (hour < 10) hour = '0' + hour
    if (minute < 10) minute = '0' + minute
    if (second < 10) second = '0' + second

    return `${hour}:${minute}:${second}`
}

export const fieldToString = (value, type) => {
    if (type === 'DateTimeField') {
        value = datetimeToString(value)
    } else if (type === 'DateField') {
        value = dateToString(value)
    } else if (type === 'TimeField') {
        value = timeToString(value)
    } else if (type === 'BooleanField') {
        value = value ? 'True' : 'False'
    } else {
        value = value.toString()
    }

    return value
}
