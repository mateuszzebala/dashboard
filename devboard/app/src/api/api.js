import axios from 'axios'
import { ENDPOINTS } from './endpoints'
import { LINKS } from '../router/links'
import { initSubLinks } from '../apps/apps'

const manifest_location = '/manifest.json'

export const MANIFEST = await fetch(manifest_location).then(async (data) => {
    return await data.json()
})

export const API_URL = MANIFEST.api_url
export const WS_API_URL = MANIFEST.ws_api_url

export const INIT = async () => {
    return Promise.all([initSubLinks()])
}

export const API = (path, args = null) => {
    let url = `${API_URL}${path.join('/')}/`
    if (args) {
        const params = new URLSearchParams(args)
        url += `?${params.toString()}`
    }
    return url
}

export const WS_API = (path, args = null) => {
    let url = `${WS_API_URL}${path.join('/')}/`
    if (args) {
        const params = new URLSearchParams(args)
        url += `?${params.toString()}`
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
    const data = await FETCH(ENDPOINTS.auth.me())
    if (data) {
        return data.data.signin
    } else {
        return null
    }
}

export const FETCH = async (url, data = {}, headers = {}, method = 'POST') => {
    const formData = new FormData()
    const tokenData = await CSRF()

    Object.keys(data).forEach((field) => {
        formData.append(field, data[field])
    })

    formData.append('csrfmiddlewaretoken', tokenData.token)
    if (!tokenData.access) {
        if (window.location.pathname !== LINKS.auth.signin()) window.location.href = LINKS.auth.signinNext(window.location.pathname)
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
