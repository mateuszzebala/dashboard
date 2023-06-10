import axios from 'axios'
import { endpoints } from './endpoints'

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

async function CSRF() {
    const response = await fetch(endpoints.auth.csrf(), {
        credentials: 'include',
    })
    const data = await response.json()

    return data.token
}

export const SIGNIN = async () => {
    return (await FETCH(endpoints.auth.me())).data.signin
}

export const FETCH = async (url, data = {}, headers = {}, method = 'POST') => {
    const formData = new FormData()
    const token = await CSRF()
    Object.keys(data).forEach((field) => {
        formData.append(field, data[field])
    })
    formData.append('csrfmiddlewaretoken', token)

    return axios({
        url,
        data: formData,
        method,
        headers: {
            'Content-Type': 'multipart/formdata',
            'X-Csrftoken': token,
            ...headers,
        },
        withCredentials: true,
    })
}
