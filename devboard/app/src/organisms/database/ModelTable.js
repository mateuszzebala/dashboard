import { Table, HeaderRow, Row, Field } from '../../atoms'
import React from 'react'
import { Loading } from '../../atoms'
import { Tooltip } from '../../atoms/Tooltip'
import { fieldToString, toBoolStr } from '../../utils/utils'
import styled from 'styled-components'
import { HiSelector } from 'react-icons/hi'
import { LINKS } from '../../router/links'
import { useNavigate, useParams } from 'react-router'

const StyledWrapper = styled.div`
    height: 100%;
    overflow-y: auto;
    width: 100%;
  
`

const StyledField = styled.td`
    border: 1px solid ${({ theme }) => theme.primary};
    text-align: center;
    padding: 15px 10px;
    width: auto;
    display: table-cell;
    background-color: ${({ selected, theme }) =>
        selected ? theme.primary : theme.secondary} !important;
    color: ${({ selected, theme }) =>
        selected ? theme.secondary : theme.primary} !important;

    white-space: nowrap;
    max-width: 150px;
    transition: background-color 0.2s, color 0.2s;
    overflow: hidden;
    cursor: pointer;
    text-overflow: ellipsis;
`

const StyledHeaderField = styled.div`
    font-weight: normal;
    display: flex;
    align-items: center;
    padding: 8px 10px;
    justify-content: space-between;
    cursor: pointer;
`

const StyledLoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const ModelTable = ({
    data,
    modelData,
    orderBy,
    setOrderBy,
    setAsc,
    selectedItems,
    setSelectedItems,
}) => {
    const navigate = useNavigate()
    const { modelName } = useParams()

    return (
    <StyledWrapper>
            <Table>
                <thead>
                    <HeaderRow>
                        {modelData.registered_fields &&
                            modelData.registered_fields.map((field) => {
                                return (
                                    <Field key={field}>
                                        <StyledHeaderField
                                            onClick={modelData.fields[field] ? () => {
                                                if (orderBy === field)
                                                    setAsc((prev) => !prev)
                                                setOrderBy(field)
                                            } : () => {}}
                                        >
                                            {field} {modelData.fields[field] && <HiSelector />}
                                        </StyledHeaderField>
                                    </Field>
                                )
                            })}
                    </HeaderRow>
                </thead>
                <tbody>
                    {!data ||
                        !modelData ||
                        !data.items ||
                        data.items.map((item) => (
                            <Row key={item.pk}>
                                {item.registered_fields &&
                                    Object.keys(item.registered_fields).map((field) => {
                                        const content = fieldToString(
                                            item.registered_fields[field],
                                            modelData.fields[field] ? modelData.fields[field].type : 'CharField'
                                        )
                                        return (
                                            <StyledField
                                                selected={toBoolStr(
                                                    selectedItems.includes(item.pk)
                                                )}
                                                key={field}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.detail > 1 && navigate(LINKS.database.item(modelName,item.pk))
                                                    setSelectedItems((prev) => {
                                                        if ( selectedItems.includes( item.pk )) 
                                                            return prev.filter((pk) => pk !== item.pk)
                                                        else return [...prev, item.pk]
                                                    })
                                                }}
                                            >
                                                <Tooltip text={content}>
                                                    {content}
                                                </Tooltip>
                                            </StyledField>
                                        )
                                    })}
                            </Row>
                        ))}
                </tbody>
            </Table>
            {!data ||
                !modelData ||
                (!data.items && (
                    <StyledLoadingWrapper>
                        <Loading size={1.5} />
                    </StyledLoadingWrapper>
                ))}
        </StyledWrapper>
    )
}
