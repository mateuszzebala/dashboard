import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useParams } from 'react-router'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import styled from 'styled-components'
import { LINKS } from '../../router/links'
import { FloatingActionButton } from '../../atoms/FloatingActionButton'
import { FaCheck, FaPlus } from 'react-icons/fa'
import { Button } from '../../atoms/Button'
import { Paginator } from '../../atoms/Paginator'
import { Input } from '../../atoms/Input'
import { APPS } from '../../apps/apps'
import { ModelTable } from '../../organisms/database/ModelTable'
import { Counter } from '../../atoms/Counter'
import { Confirm } from '../../atoms/modalforms/Confirm'
import { FiEdit, FiTrash } from 'react-icons/fi'
import {PiExportBold} from 'react-icons/pi'
import {PiFunctionBold} from 'react-icons/pi'
import { useModalForm } from '../../utils/hooks'
import { Export } from '../../atoms/modalforms/Export'
import { Actions } from '../../atoms/modalforms/Actions'
import { useSearchParams } from 'react-router-dom'
import { IoMdOpen } from 'react-icons/io'

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
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = React.useState(searchParams.get('page') ? parseInt(searchParams.get('page')) : 0)
    const [pages, setPages] = React.useState(2)
    const [searchQuery, setSearchQuery] = React.useState(searchParams.get('query') || '')
    const [length, setLength] = React.useState(searchParams.get('length') ? parseInt(searchParams.get('length')) : 10)
    const [orderBy, setOrderBy] = React.useState(searchParams.get('orderBy') == 'null' ? null : searchParams.get('orderBy'))
    const [asc, setAsc] = React.useState(searchParams.get('asc') == 'false' ? false : true)
    const [action, setAction] = React.useState()
    const [modelData, setModelData] = React.useState(false)
    const [data, setData] = React.useState([])
    const [fields, setFields] = React.useState([])
    const [selectedItems, setSelectedItems] = React.useState([])
    const [error, setError] = React.useState(null)
    
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
            const registeredFields = Object.keys(res.data.fields)
                .filter((field) => !resModelData.fields[field].relation.is)
                .filter((field) => resModelData.fields[field].registered)

            if (registeredFields.length === 0) {
                setFields(
                    Object.keys(res.data.fields).filter(
                        (field) => !resModelData.fields[field].relation.is
                    )
                )
            } else {
                setFields(registeredFields)
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
                            size={1.3}
                            icon={<FaCheck />}
                            onKey={{
                                key: 'a',
                                ctrlKey: true,
                                prevent: true,
                            }}
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
                            to={LINKS.database.putItem(modelName)}
                            icon={<FaPlus />}
                            size={1.3}
                        />

                        {selectedItems.length >= 1 && (
                            <>
                                <Button
                                    second
                                    size={1.3}
                                    tooltip={'DELETE SELECTED'}
                                    icon={<FiTrash />}
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
                                    size={1.3} 
                                    tooltip={'EXPORT'} 
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
                                    size={1.2} 
                                    second
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
                                    size={1.3}
                                    tooltip={'EDIT ITEM'}
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
                                    size={1.3}
                                    tooltip={'SHOW ITEM'}
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
                            unit="rows"
                            size={1.2}
                        />
                        <Input
                            label={'QUERY'}
                            value={searchQuery}
                            onKey={{
                                key: 'f',
                                ctrlKey: true,
                                prevent: true,
                            }}
                            setValue={setSearchQuery}
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
                        fields={fields}
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
                        icon={<FaPlus />}
                        second
                        size={1.3}
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
