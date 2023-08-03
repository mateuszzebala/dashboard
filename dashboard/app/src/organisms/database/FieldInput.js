import React from 'react'
import { CharFieldInput } from './fieldinputs/CharFieldInput'
import { BooleanFieldInput } from './fieldinputs/BooleanFieldInput'
import { TextFieldInput } from './fieldinputs/TextFieldInput'
import { JSONFieldInput } from './fieldinputs/JSONFieldInput'
import { IntegerFieldInput } from './fieldinputs/IntegerFieldInput'
import { DateTimeFieldInput } from './fieldinputs/DateTimeField'
import { DateFieldInput } from './fieldinputs/DateFieldInput'
import { TimeFieldInput } from './fieldinputs/TimeFieldInput'
import { FileFieldInput } from './fieldinputs/FileFieldInput'
import { DurationFieldInput } from './fieldinputs/DurationField'
import { FloatFieldInput } from './fieldinputs/FloatField'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    padding: 10px;
`

const Inputs = {
    CharField: CharFieldInput,
    BooleanField: BooleanFieldInput,
    TextField: TextFieldInput,
    JSONField: JSONFieldInput,
    IntegerField: IntegerFieldInput,
    DateTimeField: DateTimeFieldInput,
    DateField: DateFieldInput,
    TimeField: TimeFieldInput,
    FileField: FileFieldInput,
    DurationField: DurationFieldInput,
    FloatField: FloatFieldInput,
}

export const FieldInput = ({ field, onChange }) => {
    const Input = Inputs[field.type]
    if (!Input) return field.name
    return (
        <StyledWrapper>
            <Input field={field} onChange={onChange} />
        </StyledWrapper>
    )
}
