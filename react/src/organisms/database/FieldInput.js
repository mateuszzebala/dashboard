import React from 'react'
import styled from 'styled-components'
import { Input } from '../../atoms/Input'
import { Switch } from '../../atoms/Switch'

const StyledWrapper = styled.div``
const StyledRow = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const INPUTS = {
    CharField: (props) => (
        <Input
            label={props.field.name}
            value={props.value}
            setValue={props.setValue}
        />
    ),
    TextField: (props) => (
        <Input
            textarea
            label={props.field.name}
            value={props.value}
            setValue={props.setValue}
        />
    ),
    FileField: (props) => (
        <Input
            type="file"
            label={props.field.name}
            value={props.value}
            setValue={props.setValue}
        />
    ),
    IntegerField: (props) => (
        <Input
            type="number"
            label={props.field.name}
            value={props.value}
            setValue={props.setValue}
        />
    ),
    FloatField: (props) => (
        <Input
            type="number"
            step={0.00001}
            label={props.field.name}
            value={props.value}
            setValue={props.setValue}
        />
    ),
    BooleanField: (props) => (
        <StyledRow>
            <span>{props.field.name}</span>
            <Switch value={props.value} setValue={props.setValue} />
        </StyledRow>
    ),
    DateTimeField: (props) => (
        <Input
            type="datetime-local"
            label={props.field.name}
            value={props.value}
            setValue={props.setValue}
        />
    ),
}

export const FieldInput = ({ field }) => {
    const [value, setValue] = React.useState()
    return (
        <StyledWrapper>
            {INPUTS[field.type]
                ? INPUTS[field.type]({ field, value, setValue })
                : field.name}
        </StyledWrapper>
    )
}
