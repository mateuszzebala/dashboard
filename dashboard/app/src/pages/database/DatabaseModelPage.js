import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useParams } from 'react-router'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import styled from 'styled-components'
import { links } from '../../router/links'
import { FloatingActionButton } from '../../atoms/FloatingActionButton'
import { FaCheck, FaPlus } from 'react-icons/fa'
import { Button } from '../../atoms/Button'
import { Paginator } from '../../atoms/Paginator'
import { Input } from '../../atoms/Input'
import { APPS } from '../../apps/apps'
import { ModelTable } from '../../organisms/database/ModelTable'
import { Counter } from '../../atoms/Counter'
import { FiEdit, FiTrash } from 'react-icons/fi'
import {
    BsArrowUpRightSquare,
    BsFiletypeCsv,
    BsFiletypeJson,
    BsFiletypeXlsx,
} from 'react-icons/bs'

const StyledWrapper = styled.div`
    max-width: 100%;
    flex-direction: column;
    gap: 20px;
    overflow-x: scroll;
    padding: 30px 0;
    display: flex;
    align-items: flex-start;
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
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
`

export const DatabaseModelPage = () => {
    const { modelName } = useParams()
    const [page, setPage] = React.useState(0)
    const [pages, setPages] = React.useState(2)
    const [searchQuery, setSearchQuery] = React.useState('')
    const [length, setLength] = React.useState(10)
    const [orderBy, setOrderBy] = React.useState(null)
    const [asc, setAsc] = React.useState(true)
    const [modelData, setModelData] = React.useState(false)
    const [data, setData] = React.useState([])
    const [fields, setFields] = React.useState([])
    const [selectedItems, setSelectedItems] = React.useState([])

    React.useEffect(() => {
        FETCH(ENDPOINTS.database.model(modelName)).then((res) => {
            const resModelData = res.data
            setModelData(resModelData)
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
    }, [])

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
    }

    React.useEffect(fetchItems, [page, length, orderBy, asc, searchQuery])

    return (
        <MainTemplate
            app={APPS.database}
            title={modelName}
            submenuChildren={
                <StyledMenu>
                    <StyledMenuSide>
                        <Button
                            icon={<FaCheck />}
                            onClick={() => {
                                if (selectedItems && selectedItems.length === 0)
                                    setSelectedItems(
                                        data.items.map((item) => item.pk)
                                    )
                                else setSelectedItems([])
                            }}
                        />

                        {selectedItems.length >= 1 && (
                            <>
                                <Button
                                    tooltip={'DELETE SELECTED'}
                                    icon={<FiTrash />}
                                />
                                <Button
                                    tooltip={'EXPORT JSON'}
                                    icon={<BsFiletypeJson />}
                                />
                                <Button
                                    tooltip={'EXPORT XLSX'}
                                    icon={<BsFiletypeXlsx />}
                                />
                                <Button
                                    tooltip={'EXPORT CSV'}
                                    icon={<BsFiletypeCsv />}
                                />
                            </>
                        )}

                        {selectedItems.length === 1 && (
                            <>
                                <Button
                                    tooltip={'EDIT ITEM'}
                                    icon={<FiEdit />}
                                />
                                <Button
                                    tooltip={'SHOW ITEM'}
                                    icon={<BsArrowUpRightSquare />}
                                    to={links.database.item(
                                        modelName,
                                        selectedItems[0]
                                    )}
                                />
                            </>
                        )}
                    </StyledMenuSide>
                    <StyledMenuSide>
                        <Counter
                            value={length}
                            setValue={setLength}
                            min={1}
                            max={1000}
                            unit="rows"
                            size={1.2}
                        />
                        <Input
                            label={'QUERY'}
                            value={searchQuery}
                            setValue={setSearchQuery}
                        />
                    </StyledMenuSide>
                </StyledMenu>
            }
        >
            {!modelData ? (
                ''
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
                        to={links.database.putItem(modelName)}
                        icon={<FaPlus />}
                        circle
                        size={1.5}
                    />
                    <StyledFooter>
                        <Paginator
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
