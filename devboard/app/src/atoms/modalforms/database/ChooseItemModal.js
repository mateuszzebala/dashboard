import React from 'react'
import styled from 'styled-components'
import { Input } from '../../inputs/Input'
import { ENDPOINTS } from '../../../api/endpoints'
import { FETCH } from '../../../api/api'
import { Paginator } from '../../Paginator'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 20px;
`

const StyledItems = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    max-height: 500px;
    padding: 5px;
    overflow: scroll;
    gap: 10px;
`

const StyledItem = styled.button`
    transition: color 0.1s, background-color 0.1s, outline-width 0.1s;
    background-color: ${({ theme, second }) => (second ? theme.secondary : theme.primary)};
    color: ${({ theme, second }) => (second ? theme.primary : theme.secondary)};
    font-size: 20px;
    border-radius: 5px;
    width: 100%;
    padding: 0 20px;
    overflow: hidden;
    min-height: 50px;
    display: inline-flex;
    text-align: center;
    overflow: hidden;
    align-items: center;
    justify-content: flex-start;
    text-overflow: ellipsis;
    font-weight: 300;
    cursor: pointer;
    border: 0;
    outline: 0px solid ${({theme})=>theme.quaternary}88;
    &:hover,
    &:focus {
        outline-width: 3px;
        background-color: ${({ theme, second }) => (second ? theme.quaternary : theme.primary)};
    }
`

export const ChooseItemModal = ({model, value=null, setOpen, todo = () => {}}) => {
    const [query, setQuery] = React.useState('')
    const [items, setItems] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [pages, setPages] = React.useState(0)

    React.useEffect(()=>{
        FETCH(ENDPOINTS.database.items(model, {length: 30, query, page})).then(data => {
            setItems(data.data.items)
            setPages(data.data.pages)
        })
    }, [query, page])

    return (
        <StyledWrapper>
            <Input width={'100%'} size={1.1} label={'QUERY'} value={query} setValue={setQuery}/>
            <StyledItems>
                {items.map(item => (
                    <StyledItem second={value !== item.pk} key={item.pk} onClick={()=>{
                        todo(item.pk === value ? null : item)
                        setOpen(false)
                    }}>
                        {item.str}
                    </StyledItem>
                ))}
            </StyledItems>
            <Paginator minimum second pages={pages} value={page} setValue={setPage}/>
        </StyledWrapper>
    )
}