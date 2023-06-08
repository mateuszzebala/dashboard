import React, { useState } from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { useNavigate, useParams } from 'react-router'
import { FETCH } from '../../api/api'
import { endpoints } from '../../api/endpoints'
import styled from 'styled-components'
import { links } from '../../router/links'
import { FloatingActionButton } from '../../atoms/FloatingActionButton'
import { FaCheck, FaMinus, FaPlus, FaSearch } from 'react-icons/fa'
import { Button } from '../../atoms/Button'
import { Typography } from '../../atoms/Typography'
import { Paginator } from '../../atoms/Paginator'
import { Switch } from '../../atoms/Switch'
import { Input } from '../../atoms/Input'
import { Select } from '../../atoms/Select'
import { Modal } from '../../atoms/Modal'
import { APPS } from '../../apps/apps'
import { ModelTable } from '../../organisms/database/ModelTable'
import { PutItemForm } from '../../organisms/database/PutItemForm'

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
    gap: 20px;
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
    const [showNewItemModal, setShowNewItemModal] = useState(false)
    const [page, setPage] = React.useState(0)
    const [pages, setPages] = React.useState(2)
    const [searchQuery, setSearchQuery] = React.useState('')
    const [length, setLength] = React.useState(30)
    const [orderBy, setOrderBy] = React.useState('pk')
    const [asc, setAsc] = React.useState(true)
    const [modelData, setModelData] = React.useState(false)
    const [data, setData] = React.useState([])
    const [fields, setFields] = React.useState([])
    const navigate = useNavigate()

    const handleRowClick = (item) => {
        navigate(links.database.item(modelName, item.pk))
    }

    React.useEffect(() => {
        FETCH(endpoints.database.model(modelName)).then((res) => {
            const resModelData = res.data
            setModelData(resModelData)
            setFields(
                Object.keys(res.data.fields)
                    .filter((field) => !resModelData.fields[field].relation.is)
                    .filter((field) => resModelData.fields[field].registered)
            )
        })
    }, [])

    React.useEffect(() => {
        FETCH(
            endpoints.database.items(modelName, {
                page,
                length,
                order_by: orderBy.toString(),
                asc: asc.toString(),
                query: searchQuery,
            })
        ).then((res) => {
            setData(res.data)
            setPages(res.data.pages)
        })
    }, [page, length, orderBy, asc, searchQuery])

    return !modelData ? (
        ''
    ) : (
        <MainTemplate app={APPS.database}>
            <StyledWrapper>
                <StyledMenu>
                    <Button icon={<FaCheck />}>ALL</Button>
                    <Input
                        label={'QUERY'}
                        value={searchQuery}
                        setValue={setSearchQuery}
                    />
                    <Button icon={<FaSearch />}>SEARCH</Button>
                    <Select
                        data={fields.reduce((flds, key) => {
                            flds[key] = key
                            return flds
                        }, {})}
                        value={orderBy}
                        setValue={setOrderBy}
                    />
                    <Typography variant={'h2'}>ASC:</Typography>
                    <Switch size={1.5} value={asc} setValue={setAsc} />
                    <Button
                        onClick={() => {
                            setLength((prev) => (prev > 1 ? prev - 1 : prev))
                        }}
                        icon={<FaMinus />}
                    />
                    <Typography variant={'h2'}>
                        {length} {length > 1 ? 'rows' : 'row'}
                    </Typography>
                    <Button
                        onClick={() => {
                            setLength((prev) => prev + 1)
                        }}
                        icon={<FaPlus />}
                    />
                </StyledMenu>
                <ModelTable
                    fields={fields}
                    data={data}
                    modelData={modelData}
                    handleRowClick={handleRowClick}
                />
                <Modal
                    title={'CREATE NEW ITEM'}
                    open={showNewItemModal}
                    setOpen={setShowNewItemModal}
                >
                    <PutItemForm modelName={modelName} />
                </Modal>
                <FloatingActionButton
                    onClick={() => {
                        setShowNewItemModal(true)
                    }}
                    icon={<FaPlus />}
                    circle
                    size={1.5}
                />
                <StyledFooter>
                    <Paginator value={page} pages={pages} setValue={setPage} />
                </StyledFooter>
            </StyledWrapper>
        </MainTemplate>
    )
}
