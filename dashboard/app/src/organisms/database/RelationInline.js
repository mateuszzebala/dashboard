import React from 'react'
import { Button } from '../../atoms/Button'
import { LINKS } from '../../router/links'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledWrapper = styled.div`
    display: flex;
    overflow: auto;
    gap: 10px;
    a{
        color: ${({theme})=>theme.primary};
        &:hover{
            text-decoration: underline;
        }
    }
`

const ManyToManyInline = ({ value, model }) => {
    if (value && value.length)
        return (
            <StyledWrapper>
                {value.map((item) => (
                    <Link
                        key={item}
                        second
                        to={LINKS.database.item(model, item)}
                    >
                        {item}
                    </Link>
                ))}
            </StyledWrapper>
        )
    else return 'None'
}
const ManyToOneInline = ({ value, model }) => {
    if (value)
        return (
            <StyledWrapper>
                <Link to={LINKS.database.item(model, value)}>
                    {value}
                </Link>
            </StyledWrapper>
        )
    else return 'None'
}

const OneToOneInline = ({ value, model }) => {
    if (value)
        return (
            <StyledWrapper>
                <Link to={LINKS.database.item(model, value)}>
                    {value}
                </Link>
            </StyledWrapper>
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
