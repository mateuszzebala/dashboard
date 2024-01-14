import React from 'react'
import styled from 'styled-components'
import { LogItem } from './LogItem'
import { FETCH } from '../../../api/api'
import { ENDPOINTS } from '../../../api/endpoints'
import { isMobile } from 'react-device-detect'
import { toBoolStr } from '../../../utils/utils'

const StyledWrapper = styled.div`
    box-shadow: 0 0 5px -3px ${({ theme }) => theme.primary};
    padding: 10px;
    width: 100%;
    border-radius: 10px;
    overflow: scroll;
    min-height: ${({ isMobile }) => (isMobile? '50%' : '100%')};
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
`

export const LogsList = ({ reloadEachSecond = false }) => {
    const [logs, setLogs] = React.useState([])

    const handleReload = () => {
        FETCH(ENDPOINTS.requests.get(), { sortBy: 'datetime', asc: false, length: 10, page: 0 }).then((data) => {
            setLogs(data.data.logs)
        })
    }

    React.useEffect(() => {
        handleReload()
        if (reloadEachSecond) {
            const interval = setInterval(() => {
                handleReload()
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [])

    return (
        <StyledWrapper isMobile={toBoolStr(isMobile)}>
            <StyledList onClick={handleReload}>
                {Object.keys(logs).map((index) => (
                    <LogItem key={index} {...logs[index]} />
                ))}
            </StyledList>
        </StyledWrapper>
    )
}
