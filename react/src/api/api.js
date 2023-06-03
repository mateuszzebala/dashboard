import axios from 'axios'

export const API_URL = 'http://localhost:8000/dashboard/api/'

export const makeAPIurl = (path, args = null) => {
    let url = API_URL
    url += path.join('/')
    url += '/'
    if (args) {
        url += '?'
        Object.keys(args).forEach((argName) => {
            url += argName
            url += '='
            url += args[argName]
            url += '&'
        })
        let temp = [...url]
        temp.splice(-1, 1)
        url = temp.join('')
    }
    return url
}

export const sendData = (
    url,
    formData = null,
    headers = {},
    method = 'POST'
) => {
    return axios({
        url,
        data: formData,
        method,
        headers: {
            'Content-Type': 'multipart/formdata',
            ...headers,
        },
    })
}
