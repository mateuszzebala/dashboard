import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useParams } from 'react-router'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import styled from 'styled-components'
import { LINKS } from '../../router/links'
import { Actions, Button, Confirm, Counter, Export, FloatingActionButton, Paginator, Prompt, Select } from '../../atoms'
import { FaSort } from 'react-icons/fa'
import { APPS } from '../../apps/apps'
import { ModelTable } from '../../organisms/database/ModelTable'
import { FiCheck, FiEdit, FiPlus, FiSearch, FiTrash } from 'react-icons/fi'
import { PiExportBold, PiFunctionBold } from 'react-icons/pi'
import { useModalForm, useSettings } from '../../utils/hooks'
import { useSearchParams } from 'react-router-dom'
import { IoMdOpen } from 'react-icons/io'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'

const StyledError = styled.span`
    font-weight: 500;
    font-size: 20px;
    color: ${({theme})=>theme.error};
`

const StyledWrapper = styled.div`
    max-width: 100%;
    flex-direction: column;
    gap: 20px;
    overflow-x: scroll;

    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    &::-webkit-scrollbar {
        height: 0;
    }
    table {
        width: 100%;
    }
`

const StyledMenu = styled.div`
    display: flex;
    padding: 0 10px;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`
const StyledMenuSide = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const StyledFooter = styled.div`
    display: flex;
    padding: 0 10px;

    align-items: center;
    justify-content: center;
    width: 100%;
`

export const DatabaseModelPage = () => {
    const { modelName } = useParams()
    const modalForm = useModalForm()
    const [settings] = useSettings()
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = React.useState(searchParams.get('page') ? parseInt(searchParams.get('page')) : 0)
    const [pages, setPages] = React.useState(2)
    const [searchQuery, setSearchQuery] = React.useState(searchParams.get('query') || '')
    const [length, setLength] = React.useState(searchParams.get('length') ? parseInt(searchParams.get('length')) : settings['database.default_number_of_rows'])
    const [orderBy, setOrderBy] = React.useState(searchParams.get('orderBy') == 'null' ? null : searchParams.get('orderBy'))
    const [asc, setAsc] = React.useState(searchParams.get('asc') == 'false' ? false : true)
    const [action, setAction] = React.useState()
    const [modelData, setModelData] = React.useState(false)
    const [data, setData] = React.useState([])
    const [selectedItems, setSelectedItems] = React.useState([])
    const [error, setError] = React.useState(null)
    const [queryError, setQueryError] = React.useState(false)

    React.useEffect(()=>{
        setSearchParams(prev => ({
            ...prev, 
            page,
            query: searchQuery, 
            length, 
            orderBy, 
            asc: asc ? 'true' : 'false', 
        }))
    }, [page, searchQuery, length, orderBy, asc])


    React.useEffect(() => {
        FETCH(ENDPOINTS.database.model(modelName)).then((res) => {
            const resModelData = res.data
            setModelData(resModelData)
            if(res.data.error){
                setError(res.data.error)
                return
            }
           
        })
    }, [modelName])

    const fetchItems = () => {
        FETCH(
            ENDPOINTS.database.items(modelName, {
                page,
                length,
                order_by: orderBy ? orderBy : 'pk',
                asc: asc.toString(),
                query: searchQuery,
            })
        ).then((res) => {
            if(res.data.queryError) setQueryError(true)
            else setQueryError(false)
            setData(res.data)
            setPages(res.data.pages)
        })
        setSelectedItems([])
    }

    React.useEffect(fetchItems, [
        page,
        length,
        orderBy,
        asc,
        searchQuery,
        modelName,
    ])
    React.useEffect(() => {
        setPage(0)
    }, [length, orderBy, asc, searchQuery])

    return (
        <MainTemplate
            app={APPS.database}
            title={modelName.toUpperCase()}
            submenuChildren={
                <StyledMenu>
                    <StyledMenuSide>
                        <Button
                            second
                            size={1.4}
                            icon={<FiCheck />}
                            onKey={{
                                key: 'a',
                                ctrlKey: true,
                                prevent: true,
                            }}
                            subContent={'SELECT'}
                            onClick={() => {
                                if (selectedItems && selectedItems.length === 0)
                                    setSelectedItems(
                                        data.items.map((item) => item.pk)
                                    )
                                else setSelectedItems([])
                            }}
                        />
                        <Button
                            second
                            subContent={'NEW'}
                            to={LINKS.database.putItem(modelName)}
                            icon={<FiPlus />}
                            size={1.4}
                        />
                        <Select
                            asButton
                            subContent={'ORDER BY'}
                            data={modelData ? Object.keys(modelData.fields) : []}
                            value={modelData ? Object.keys(modelData.fields).indexOf(orderBy) : 0}
                            setValue={(val)=>{
                                setOrderBy(Object.keys(modelData.fields)[val])
                            }}
                            second
                            icon={<FaSort />}
                            size={1.4}

                        />
                        <Button
                            subContent={asc ? 'ASC' : 'DESC'}
                            second
                            icon={asc ? <AiOutlineSortAscending/> : <AiOutlineSortDescending/>}
                            onClick={()=>setAsc(prev => !prev)}
                            size={1.4}
                        />

                        {selectedItems.length >= 1 && (
                            <>
                                <Button
                                    second
                                    size={1.4}
                                    tooltip={'DELETE SELECTED'}
                                    icon={<FiTrash />}
                                    subContent={'DELETE'}
                                    onKey={'Delete'}
                                    onClick={() => {
                                        modalForm({
                                            content: Confirm,
                                            title: `Delete ${
                                                selectedItems.length
                                            } item${
                                                selectedItems.length ? 's' : ''
                                            }?`,
                                            icon: <FiTrash />,
                                            todo: () => {
                                                selectedItems.forEach(
                                                    (item) => {
                                                        FETCH(
                                                            ENDPOINTS.database.item(
                                                                modelName,
                                                                item
                                                            ),
                                                            { method: 'DELETE' }
                                                        ).then(() => {
                                                            fetchItems()
                                                        })
                                                    }
                                                )
                                            },
                                        })
                                    }}
                                />
                                <Button 
                                    second 
                                    size={1.4} 
                                    tooltip={'EXPORT'}
                                    subContent={'EXPORT'}
                                    icon={<PiExportBold/>}
                                    onClick={()=>{
                                        modalForm({
                                            content: Export,
                                            title: 'EXPORT',
                                            icon: <PiExportBold/>,
                                            todo: ()=>{}
                                        })
                                    }}
                                />
                                {modelData.actions != undefined && modelData.actions.length != 0 && <Button 
                                    size={1.4} 
                                    second
                                    subContent={'ACTION'}
                                    onClick={()=>{
                                        modalForm({
                                            content: Actions,
                                            title: 'MAKE ACTION',
                                            actions: modelData.actions,
                                            action,
                                            setAction,
                                            icon: <PiFunctionBold/>,
                                            todo: ()=>{}
                                        })
                                    }}
                                >ACTIONS</Button>}
                            </>
                        )}

                        {selectedItems.length === 1 && (
                            <>
                                <Button
                                    second
                                    size={1.4}
                                    tooltip={'EDIT ITEM'}
                                    subContent={'EDIT'}
                                    icon={<FiEdit />}
                                    to={LINKS.database.patchItem(
                                        modelName,
                                        selectedItems[0]
                                    )}
                                    onKey={{
                                        key: 'e',
                                        ctrlKey: true,
                                        prevent: true,
                                    }}
                                />
                                <Button
                                    second
                                    size={1.4}
                                    tooltip={'SHOW ITEM'}
                                    subContent={'SHOW'}
                                    icon={<IoMdOpen />}
                                    to={LINKS.database.item(
                                        modelName,
                                        selectedItems[0]
                                    )}
                                    onKey={{
                                        key: 'o',
                                        ctrlKey: true,
                                        prevent: true,
                                    }}
                                />
                  
                                
                            </>
                        )}
                       
                    </StyledMenuSide>
                    <StyledMenuSide>
                       
                        <Counter
                            value={length}
                            setValue={setLength}
                            min={0}
                            max={1000}
                            unit="Rows"
                            size={1.4}
                        />
                        <Button
                            icon={<FiSearch/>}
                            second
                            size={1.4}
                            onKey={{
                                ctrlKey: true,
                                key: 'f',
                                prevent: true
                            }}
                            subContent={'QUERY'}
                            onClick={()=>{
                                modalForm({
                                    content: Prompt,
                                    icon: <FiSearch/>,
                                    title: 'QUERY',
                                    initValue: searchQuery,
                                    setButton: 'SEARCH',
                                    todo: (val)=>{
                                        setSearchQuery(val)
                                    }
                                })
                            }}
                        />
                    </StyledMenuSide>
                </StyledMenu>
            }
        >
            {error || !modelData ? (
                <StyledError>{error}</StyledError>
            ) : (
                <StyledWrapper>
                    <ModelTable
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        data={data}
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        setAsc={setAsc}
                        modelData={modelData}
                    />

                    <FloatingActionButton
                        to={LINKS.database.putItem(modelName)}
                        icon={<FiPlus />}
                        second
                        size={1.4}
                    />
                    <StyledFooter>
                        <Paginator
                            second
                            value={page}
                            pages={pages}
                            setValue={setPage}
                        />
                    </StyledFooter>
                </StyledWrapper>
            )}
        </MainTemplate>
    )
}
