import { terminalCodesToHtml } from 'terminal-codes-to-html'

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

export const durationToString = (duration) => {
    let { days, seconds } = duration
    seconds += days * 24 * 3600
    days = Math.floor(seconds / (3600 * 24))
    seconds -= days * 3600 * 24
    let hours = Math.floor(seconds / 3600)
    seconds -= hours * 3600
    let minutes = Math.floor(seconds / 60)
    seconds -= minutes * 60

    return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

export const fieldToString = (value, type) => {
    if (value === null) return 'None'
    if (value === undefined) return 'None'

    if (type === 'DateTimeField') {
        value = datetimeToString(value)
    } else if (type === 'DateField') {
        value = dateToString(value)
    } else if (type === 'TimeField') {
        value = timeToString(value)
    } else if (type === 'BooleanField') {
        value = value ? 'True' : 'False'
    } else if (type === 'DurationField') {
        value = durationToString(value)
    }
    if (type === 'JSONField') {
        value = JSON.stringify(value)
    } else {
        value = value.toString()
    }
    return value
}

export const convertTerminalTextToHTML = (text) => {
    // text = text ? text.replace('\\n', '<br>').replace('\\r', '<br>') : ''
    text = terminalCodesToHtml(text || '')
    return text.trim()
}
