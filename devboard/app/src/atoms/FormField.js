import { Input } from './inputs/Input'
import React from 'react'

export const FormField = ({ name, type }) => {
    const [value, setValue] = React.useState()
    return (
        <Input
            value={value}
            setValue={setValue}
            type={type}
            label={name.toUpperCase()}
            name={name}
        />
    )
}
