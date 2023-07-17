import axios from 'axios'
import { ENDPOINTS } from './endpoints'
import { links } from '../router/links'

const manifest_location = '/dashboard/manifest.json'

export const MANIFEST = await fetch(manifest_location).then(async (data) => {
    return await data.json()
})

export const API_URL = MANIFEST.api_url

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
    const response = await fetch(ENDPOINTS.auth.csrf(), {
        credentials: 'include',
    })
    const data = await response.json()
    return data
}

export const SIGNIN = async () => {
    return (await FETCH(ENDPOINTS.auth.me())).data.signin
}

export const FETCH = async (url, data = {}, headers = {}, method = 'POST') => {
    const formData = new FormData()
    const tokenData = await CSRF()

    Object.keys(data).forEach((field) => {
        formData.append(field, data[field])
    })

    formData.append('csrfmiddlewaretoken', tokenData.token)

    if (tokenData.username === null) {
        if (window.location.pathname !== links.auth.signin())
            window.location.href = links.auth.signinNext(
                window.location.pathname
            )
    }

    return axios({
        url,
        data: formData,
        method,
        headers: {
            'Content-Type': 'multipart/formdata',
            'X-Csrftoken': tokenData.token,
            ...headers,
        },
        withCredentials: true,
    })
}
