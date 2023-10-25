import React from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { Loading } from '../Loading'
import { Paginator } from '../Paginator'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

const StyledItems = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 5px;
    align-items: stretch;
    max-height: 400px;
    gap: 10px;
    width: 100%;
    text-align: center;
    &::-webkit-scrollbar {
        width: 0;
    }
`
const StyledHr = styled.hr`
    border: 1px solid black;
    width: 100%;
`

const StyledMenu = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const SelectItemModal = ({
    modelName,
    multiple,
    setValue,
    value,
    setOpen,
}) => {
    const [query, setQuery] = React.useState('')
    const [page, setPage] = React.useState(0)
    const [pages, setPages] = React.useState(0)
    const [items, setItems] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [tempValue, setTempValue] = React.useState(value)

    React.useEffect(() => {
        if(value.length > 0 && !value[0].pk){
            value.forEach((pk)=>{
                FETCH(ENDPOINTS.database.item(modelName, pk)).then(data => {
                    setTempValue(prev => prev.map(item => item == pk ? data.data : item))
                })
            })
        }
        else{
            console.log('TERAZ NIE')
        }
        setTempValue(value)
    }, [value])

    React.useEffect(() => {
        FETCH(
            ENDPOINTS.database.items(modelName, { length: 20, page, query })
        ).then((data) => {
            setPages(data.data.pages)
            setItems(data.data.items)
            setLoading(false)
        })
    }, [query, page])

    React.useEffect(() => {
        setValue(tempValue)
    }, [tempValue])

    return (
        <StyledWrapper>
            <StyledMenu>
                <Input value={query} setValue={setQuery} label={'SEARCH'} />
                <Paginator
                    second
                    minimum
                    value={page}
                    setValue={setPage}
                    pages={pages}
                />
            </StyledMenu>
            <StyledItems>
                {items.length ? '' : <span>0 results</span>}
                {items.map((item) => (
                    <Button
                        key={item.pk}
                        onClick={() => {
                            !multiple && setValue(item)
                            !multiple && setOpen(false)
                            multiple &&
                                setTempValue((prev) =>
                                    prev.map((i) => i.pk).includes(item.pk)
                                        ? prev.filter((i) => i.pk !== item.pk)
                                        : [...prev, item]
                                )
                        }}
                        second={
                            multiple
                                ? !tempValue.map((i) => i.pk).includes(item.pk)
                                : value !== item
                        }
                        width={'100%'}
                    >
                        {item.str}
                    </Button>
                ))}
                {multiple &&
                    !!tempValue.filter(
                        (item) => !items.map((i) => i.pk).includes(item.pk)
                    ).length && <StyledHr />}
                {multiple &&
                    tempValue
                        .filter(
                            (item) => !items.map((i) => i.pk).includes(item.pk)
                        )
                        .map((item) => (
                            <Button
                                key={item.pk ? item.pk : item}
                                onClick={() => {
                                    setTempValue((prev) =>
                                        prev.filter((i) => i.pk !== item.pk)
                                    )
                                }}
                                width={'100%'}
                            >
                                {item.str}
                            </Button>
                        ))}
                {loading && <Loading />}
            </StyledItems>
        </StyledWrapper>
    )
}
