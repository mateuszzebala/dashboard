import React from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { Loading } from '../Loading'
import { Paginator } from '../Paginator'
import { Theme } from '../Theme'
import { useModalForm, useTheme } from '../../utils/hooks'
import { FiSearch } from 'react-icons/fi'
import { Prompt } from './Prompt'

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
    justify-content: space-between;
    gap: 10px;
`

export const SelectItemModal = ({
    modelName,
    fieldName,
    multiple,
    setValue,
    value,
    setOpen,
    parentPK,
}) => {
    const [query, setQuery] = React.useState('')
    const [page, setPage] = React.useState(0)
    const [pages, setPages] = React.useState(0)
    const [items, setItems] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [tempValue, setTempValue] = React.useState(value)
    const [queryError, setQueryError] = React.useState(false)
    const [theme] = useTheme()
    const modalForm = useModalForm()

    React.useEffect(() => {
        if(parentPK){
            FETCH(ENDPOINTS.database.relation_value(modelName, fieldName, parentPK)).then(data => {
                setTempValue(data.data.value)
            })
        }
        else{
            setTempValue(value)
        }
    }, [value])

    React.useEffect(() => {
        FETCH(
            ENDPOINTS.database.possible_values(modelName, fieldName, { length: 20, page, query })
        ).then((data) => {
            setPages(data.data.pages)
            setItems(data.data.items)
            setLoading(false)
            setQueryError(data.data.queryError)
        })
    }, [query, page])

    React.useEffect(() => {
        setValue(tempValue)
    }, [tempValue])

    return (
        <StyledWrapper>
            <StyledMenu>
                <Theme value={{...theme, quaternary: queryError ? theme.error : theme.quaternary}}>
                    <Button second icon={<FiSearch/>} onClick={()=>{
                        modalForm({
                            content: Prompt,
                            title: 'SEARCH',
                            icon: <FiSearch/>,
                            todo: (val) => setQuery(val),
                            initValue: query
                        })
                    }}/>
                </Theme>
                
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
                                : (value && item) ? value.pk !== item.pk : true
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
