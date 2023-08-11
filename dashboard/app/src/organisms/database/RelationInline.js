import React from 'react'
import { Button } from '../../atoms/Button'
import { LINKS } from '../../router/links'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: flex;
    overflow: auto;
    gap: 5px;
    padding: 5px;
    &::-webkit-scrollbar {
        height: 0;
    }
`

const ManyToManyInline = ({ value, model }) => {
    if (value && value.length)
        return (
            <StyledWrapper>
                {value.map((item) => (
                    <Button
                        key={item}
                        second
                        to={LINKS.database.item(model, item)}
                    >
                        {item}
                    </Button>
                ))}
            </StyledWrapper>
        )
    else return 'None'
}
const ManyToOneInline = ({ value, model }) => {
    if (value)
        return (
            <Button second to={LINKS.database.item(model, value)}>
                {value}
            </Button>
        )
    else return 'None'
}

const OneToOneInline = ({ value, model }) => {
    if (value)
        return (
            <Button second to={LINKS.database.item(model, value)}>
                {value}
            </Button>
        )
    else return 'None'
}

export const RelationInline = ({ type, value, model }) => {
    if (type === 'many_to_one')
        return <ManyToOneInline value={value} model={model} />
    if (type === 'many_to_many')
        return <ManyToManyInline value={value} model={model} />
    if (type === 'one_to_one')
        return <OneToOneInline value={value} model={model} />
    return <>Unknown</>
}
