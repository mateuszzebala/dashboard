import { terminalCodesToHtml } from 'terminal-codes-to-html'
import String from 'string'

export const toBoolStr = (variable) => {
    return variable ? '1' : ''
}
export const range = (start, end, step = 1) => {
    return Array.from({ length: Math.floor((end - start) / step) + 1 }, (_, i) => start + i * step)
}

export const dateForDateTimeInputValue = (date) => new Date(date.getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19)

export const datetimeToString = (datetime) => {
    let { year, month, day, hours, minutes, seconds } = datetime
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    if (hours < 10) hours = '0' + hours
    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds

    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`
}

export const dateToString = (datetime) => {
    let { year, month, day } = datetime
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day

    return `${year}.${month}.${day}`
}
export const timeToString = (datetime) => {
    let { hours, minutes, seconds } = datetime
    if (hours < 10) hours = '0' + hours
    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds

    return `${hours}:${minutes}:${seconds}`
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

export const centerEllipsis = (text, width) => {
    if (text.length < width) return text
    const toCut = Math.round(text.length - width / 2)
    const leftSide = String(text).left(text.length - toCut)
    const rightSide = String(text).right(text.length - toCut)
    return `${leftSide}...${rightSide}`
}

export const ellipsis = (text, width) => {
    if (text.length < width) return text
    return text.slice(0, width) + '...'
}

export const getCursorByPosition = (top, left) => {
    const cursors = {
        'top-left': 'nw-resize',
        'top-center': 'n-resize',
        'top-right': 'ne-resize',
        'center-left': 'e-resize',
        'center-center': 'move',
        'center-right': 'e-resize',
        'bottom-left': 'sw-resize',
        'bottom-center': 'n-resize',
        'bottom-right': 'se-resize',
    }
    return cursors[top + '-' + left]
}

export const downloadURL = (url, filename) => {
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
}

export const objectEquals = (obj1, obj2) => {
    return Object.keys(obj1).every((key) => obj1[key] === obj2[key])
}

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export const variableToPythonString = (variable) => {
    if (variable === null) return 'None'
    if (variable === undefined) return 'None'
    if (variable === true) return 'True'
    if (variable === false) return 'False'
    return variable.toString()
}

export const convertKeyToANSI = ({ key, code, crtl }) => {
    if (key.length == 1) return key

    const KEYS = {
        Enter: '\n',
        Backspace: '\b',
        Tab: '\t',
    }

    console.log(KEYS[key])

    if (KEYS[key]) return KEYS[key]

    return ''
}
