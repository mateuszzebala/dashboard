import React from 'react'
import styled from 'styled-components'
import { Switch } from '../../../atoms/Switch'
import { Typography } from '../../../atoms/Typography'
import { Theme } from '../../../atoms/Theme'

const StyledWrapper = styled.div`
    padding: 20px 50px;
    box-shadow: 0 0 5px -3px black;
    border-radius: 10px;
    width: 30%;
    gap: 20px;
    display: grid;
    grid-template-columns: repeat(1, 90%);
    justify-content: center;
    max-height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 0;
    }
    h4 {
        font-weight: 500;
    }
`

const StyledToggle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 0 20px;
    gap: 10px;
`

export const ServerManage = () => {
    const [disablepPage, setDisablePage] = React.useState(true)
    const [enableLogs, setEnableLogs] = React.useState(true)
    const [enableDebug, setEnableDebug] = React.useState(true)
    const [enableNewUsers, setEnableNewUsers] = React.useState(true)
    const [DDOSBlock, setDDOSBlock] = React.useState(true)
    const [saveRequests, setSaveRequests] = React.useState(true)

    return (
        <StyledWrapper>
            <StyledToggle>
                <Typography variant={'h4'}>PAGE</Typography>
                <Theme
                    value={{
                        switch: { on: '#4dff3d', off: '#ff473d', dot: 'white' },
                    }}
                >
                    <Switch
                        value={disablepPage}
                        setValue={setDisablePage}
                        size={2}
                    />
                </Theme>
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>LOGS</Typography>
                <Switch value={enableLogs} setValue={setEnableLogs} size={2} />
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>DEBUG</Typography>
                <Switch
                    value={enableDebug}
                    setValue={setEnableDebug}
                    size={2}
                />
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>NEW USERS</Typography>
                <Switch
                    value={enableNewUsers}
                    setValue={setEnableNewUsers}
                    size={2}
                />
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>DDoS BLOCK</Typography>
                <Switch value={DDOSBlock} setValue={setDDOSBlock} size={2} />
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>SAVE REQUESTS</Typography>
                <Switch
                    value={saveRequests}
                    setValue={setSaveRequests}
                    size={2}
                />
            </StyledToggle>
        </StyledWrapper>
    )
}
