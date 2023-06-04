import React from 'react'
import styled from 'styled-components'
import { Switch } from '../../../atoms/Switch'
import { Typography } from '../../../atoms/Typography'
import { Theme } from '../../../atoms/Theme'

const StyledWrapper = styled.div`
    padding: 20px;
    box-shadow: 0 0 5px -3px black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: flex-start;
    max-height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 0;
    }
    h4 {
        font-weight: 500;
    }
`

export const ServerManage = () => {
    const [disableServer, setDisableServer] = React.useState(false)
    const [enableLogs, setEnableLogs] = React.useState(true)
    const [enableDebug, setEnableDebug] = React.useState(true)

    return (
        <StyledWrapper>
            <Typography variant={'h4'}>DISABLE SERVER</Typography>
            <Theme
                value={{
                    switch: { off: '#4dff3d', on: '#ff473d', dot: 'white' },
                }}
            >
                <Switch
                    value={disableServer}
                    setValue={setDisableServer}
                    size={2}
                />
            </Theme>
            <Typography variant={'h4'}>ENABLE LOGS</Typography>
            <Switch value={enableLogs} setValue={setEnableLogs} size={2} />
            <Typography variant={'h4'}>ENABLE DEBUG</Typography>
            <Switch value={enableDebug} setValue={setEnableDebug} size={2} />
            <Typography variant={'h4'}>ENABLE DEBUG</Typography>
            <Switch value={enableDebug} setValue={setEnableDebug} size={2} />
            <Typography variant={'h4'}>ENABLE DEBUG</Typography>
            <Switch value={enableDebug} setValue={setEnableDebug} size={2} />
            <Typography variant={'h4'}>ENABLE DEBUG</Typography>
            <Switch value={enableDebug} setValue={setEnableDebug} size={2} />
            <Typography variant={'h4'}>ENABLE DEBUG</Typography>
            <Switch value={enableDebug} setValue={setEnableDebug} size={2} />
            <Typography variant={'h4'}>ENABLE DEBUG</Typography>
            <Switch value={enableDebug} setValue={setEnableDebug} size={2} />
            <Typography variant={'h4'}>ENABLE DEBUG</Typography>
            <Switch value={enableDebug} setValue={setEnableDebug} size={2} />
        </StyledWrapper>
    )
}
