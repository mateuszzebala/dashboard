import React from 'react'
import styled from 'styled-components'
import { Button } from '../Button'
import { BsFiletypeCsv, BsFiletypeJson, BsFiletypeXlsx } from 'react-icons/bs'

const StyledButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 100%;
    justify-content: space-around;
    padding: 30px;
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const Export = ({ setOpen, todo = () => {} }) => {
    return (
        <StyledButtons>
            <StyledColumn>
                <Button
                    onClick={() => {
                        setOpen(false)
                        todo('json')
                    }}
                    size={2}
                    icon={<BsFiletypeJson />}
                />
                <span>JSON</span>
            </StyledColumn>
            <StyledColumn>
                <Button
                    onClick={() => {
                        setOpen(false)
                        todo('xlsx')
                    }}
                    size={2}
                    icon={<BsFiletypeXlsx />}
                />
                <span>XLSX</span>
            </StyledColumn>
            <StyledColumn>
                <Button
                    onClick={() => {
                        setOpen(false)
                        todo('csv')
                    }}
                    size={2}
                    icon={<BsFiletypeCsv />}
                />
                <span>CSV</span>
            </StyledColumn>
        </StyledButtons>
    )
}
