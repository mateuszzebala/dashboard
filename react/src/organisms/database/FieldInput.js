import React from 'react'
import styled from 'styled-components'
import { Input } from '../../atoms/Input'
import { Switch } from '../../atoms/Switch'
import { Typography } from '../../atoms/Typography'
import { Select } from '../../atoms/Select'
import { Tooltip } from '../../atoms/Tooltip'

const StyledWrapper = styled.div``
const StyledRow = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    min-width: 200px;
    justify-content: space-between;
`

const StyledField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    text-transform: capitalize;
`

const StyledType = styled.span`
    font-weight: 300;
`

const INPUTS = {
    CharField: (props) => {
        if (props.field.params.choices) {
            return (
                <StyledField>
                    <Typography variant={'h3'}>
                        {props.field.name} -{' '}
                        <StyledType>{props.field.type}</StyledType>
                    </Typography>
                    <Select
                        data={props.field.params.choices}
                        value={props.value}
                        setValue={props.setValue}
                    />
                </StyledField>
            )
        } else {
            return (
                <StyledField>
                    <Typography variant={'h3'}>
                        {props.field.name} -{' '}
                        <StyledType>{props.field.type}</StyledType>
                    </Typography>
                    <Input
                        maxLength={props.field.params.max_length}
                        value={props.value}
                        setValue={props.setValue}
                    />
                </StyledField>
            )
        }
    },
    TextField: (props) => (
        <StyledField>
            <Typography variant={'h3'}>
                {props.field.name} - <StyledType>{props.field.type}</StyledType>
            </Typography>
            <Input textarea value={props.value} setValue={props.setValue} />
        </StyledField>
    ),
    FileField: (props) => (
        <StyledField>
            <Typography variant={'h3'}>
                {props.field.name} - <StyledType>{props.field.type}</StyledType>
            </Typography>
            <Input type="file" value={props.value} setValue={props.setValue} />
        </StyledField>
    ),
    IntegerField: (props) => (
        <StyledField>
            <Typography variant={'h3'}>
                {props.field.name} - <StyledType>{props.field.type}</StyledType>
            </Typography>
            <Input
                type="number"
                value={props.value}
                setValue={props.setValue}
            />
        </StyledField>
    ),
    FloatField: (props) => (
        <StyledField>
            <Typography variant={'h3'}>
                {props.field.name} - <StyledType>{props.field.type}</StyledType>
            </Typography>
            <Input
                type="number"
                step={0.00001}
                value={props.value}
                setValue={props.setValue}
            />
        </StyledField>
    ),
    BooleanField: (props) => (
        <StyledRow>
            <Typography variant={'h3'}>{props.field.name}</Typography>
            <Switch size={1.4} value={props.value} setValue={props.setValue} />
        </StyledRow>
    ),
    DateTimeField: (props) => (
        <StyledField>
            <Typography variant={'h3'}>
                {props.field.name} - <StyledType>{props.field.type}</StyledType>
            </Typography>
            <Input
                type="datetime-local"
                value={props.value}
                setValue={props.setValue}
            />
        </StyledField>
    ),
    DateField: (props) => (
        <StyledField>
            <Typography variant={'h3'}>
                {props.field.name} - <StyledType>{props.field.type}</StyledType>
            </Typography>
            <Input type="date" value={props.value} setValue={props.setValue} />
        </StyledField>
    ),
    TimeField: (props) => (
        <StyledField>
            <Typography variant={'h3'}>
                {props.field.name} - <StyledType>{props.field.type}</StyledType>
            </Typography>
            <Input type="time" value={props.value} setValue={props.setValue} />
        </StyledField>
    ),
    DurationField: (props) => (
        <StyledField>
            <Typography variant={'h3'}>
                {props.field.name} - <StyledType>{props.field.type}</StyledType>
            </Typography>
            <Input
                type="number"
                value={props.value}
                setValue={props.setValue}
            />
        </StyledField>
    ),
}

export const FieldInput = ({ field }) => {
    const [value, setValue] = React.useState()
    return (
        <Tooltip text={JSON.stringify(field, false, 4)}>
            <StyledWrapper>
                {INPUTS[field.type]
                    ? INPUTS[field.type]({ field, value, setValue })
                    : field.name}
            </StyledWrapper>
        </Tooltip>
    )
}
