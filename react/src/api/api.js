import axios from 'axios'

export const API_URL = 'http://localhost:8000/dashboard/api/'

export const API = (path, args = null) => {
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

export const FETCH = (url, data = {}, headers = {}, method = 'POST') => {
    const formData = new FormData()
    Object.keys(data).forEach((field) => {
        formData.append(field, data[field])
    })
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
