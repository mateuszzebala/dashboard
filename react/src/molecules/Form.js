import React from 'react'
import styled from 'styled-components'
import { Button } from '../atoms/Button'
import { FormField } from '../atoms/FormField'
import axios from 'axios'

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`

export const Form = ({
    action = '',
    method = 'POST',
    done = () => {},
    error = () => {},
    buttonText = 'SEND',
    inputs = {},
}) => {
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios({
            url: action,
            mathod: method,
            data: new FormData(e.target),
        })
            .then((data) => {
                setLoading(false)
                done(data)
            })
            .catch((err) => {
                setLoading(false)
                error(err)
            })
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            {Object.keys(inputs).map((name) => (
                <FormField key={name} name={name} type={inputs[name]} />
            ))}
            <Button loading={loading} type={'submit'}>
                {buttonText}
            </Button>
        </StyledForm>
    )
}
