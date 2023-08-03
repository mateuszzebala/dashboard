import { FETCH } from './api'
import { ENDPOINTS } from './endpoints'

export const GETCONFIG = async (name) => {
    return FETCH(ENDPOINTS.other.get_config(name)).then(
        (data) => data.data.value
    )
}

export const SETCONFIG = async (name, value) => {
    return FETCH(ENDPOINTS.other.set_config(name), {
        value: JSON.stringify(value),
    })
}
