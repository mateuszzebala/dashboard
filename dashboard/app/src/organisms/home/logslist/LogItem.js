import React from 'react'
import styled from 'styled-components'
import { datetimeToString } from '../../../utils/utils'
import moment from 'moment'
import { useNavigate } from 'react-router'
import { LINKS } from '../../../router/links'
import { useTheme } from '../../../utils/hooks'


const StyledRequestLog = styled.div`
    background-color: ${({theme})=>theme.secondary};
    padding: 10px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    align-items: center;
    border-radius: 5px;
    gap: 5px;
    transition: transform 0.3s;
    &:hover{
        transform: ${({deleteMode})=>deleteMode ? 'none' : 'translateX(10px)'};
    }
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

export const LogItem = ({
    id,
    ip_v4,
    datetime,
    method,
    path,
    status_code,
    device,
}) => {
    const navigate = useNavigate()
    const [theme] = useTheme()
    return (
        <StyledRequestLog onClick={() => {
            navigate(LINKS.requests.request(id))
        }}>
            <StyledColumn>
                <StyledRow>
                    <span>{ip_v4}</span>
                    <span>{moment(datetime).fromNow(true)}</span>
                </StyledRow>
                <StyledRow>
                    <b>{method}</b> 
                    <b style={{color: status_code > 300 ? status_code < 500 ? theme.warning : theme.error : theme.success}}>{status_code}</b> 
                    <span>{path}</span>
                </StyledRow>
            </StyledColumn>
        </StyledRequestLog>
    )
}
