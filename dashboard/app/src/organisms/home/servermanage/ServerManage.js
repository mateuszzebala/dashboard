import React, { useState } from 'react'
import styled from 'styled-components'
import { Switch } from '../../../atoms/Switch'
import { Typography } from '../../../atoms/Typography'
import { Theme } from '../../../atoms/Theme'
import { FETCH } from '../../../api/api'
import { ENDPOINTS } from '../../../api/endpoints'
import { FiPower } from 'react-icons/fi'
import { Button } from '../../../atoms/Button'
import { useSettings, useTheme } from '../../../utils/hooks'

const StyledWrapper = styled.div`
    padding: 20px 50px;
    box-shadow: 0 0 5px -3px ${({ theme }) => theme.primary};
    border-radius: 10px;
    width: 30%;
    min-width: 200px;
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
    const [theme] = useTheme()
    const [config, setConfig] = useState({})
    const [settings, setSettings] = useSettings()

    React.useEffect(() => {
        setConfig({
            enable_server: settings['server.config.enable_server'],
            debug: settings['server.config.debug'],
            new_users: settings['server.config.new_users'],
            ddos_block: settings['server.config.ddos_block'],
            save_requests: settings['server.config.save_requests'],
        })
    }, [])

    React.useEffect(() => {
        FETCH(ENDPOINTS.settings.set(), {
            settings: JSON.stringify({
                'server.config.enable_server': config.enable_server,
                'server.config.debug': config.debug,
                'server.config.new_users': config.new_users,
                'server.config.ddos_block': config.ddos_block,
                'server.config.save_requests': config.save_requests,
            })
        }).then(() => {
            FETCH(ENDPOINTS.settings.get()).then(data => {
                setSettings(data.data)
            })
        })
    }, [config])

    return (
        <StyledWrapper>
            <StyledToggle>
                <Typography variant={'h4'}>PAGE</Typography>
                <Theme
                    value={{
                        primary: config.enable_server
                            ? theme.success
                            : theme.error,
                    }}
                >
                    <Button
                        onClick={() => {
                            setConfig((prev) => ({
                                ...prev,
                                enable_server: !prev.enable_server,
                            }))
                        }}
                        icon={<FiPower />}
                        size={2}
                    />
                </Theme>
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>DEBUG</Typography>
                <Switch
                    value={config.debug}
                    setValue={(val) => {
                        setConfig((prev) => ({
                            ...prev,
                            debug: val(config.debug),
                        }))
                    }}
                    size={2}
                />
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>NEW USERS</Typography>
                <Switch
                    value={config.new_users}
                    setValue={(val) => {
                        setConfig((prev) => ({
                            ...prev,
                            new_users: val(config.new_users),
                        }))
                    }}
                    size={2}
                />
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>DDoS BLOCK</Typography>
                <Switch
                    value={config.ddos_block}
                    setValue={(val) => {
                        setConfig((prev) => ({
                            ...prev,
                            ddos_block: val(config.ddos_block),
                        }))
                    }}
                    size={2}
                />
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>SAVE REQUESTS</Typography>
                <Switch
                    value={config.save_requests}
                    setValue={(val) => {
                        setConfig((prev) => ({
                            ...prev,
                            save_requests: val(config.save_requests),
                        }))
                    }}
                    size={2}
                />
            </StyledToggle>
        </StyledWrapper>
    )
}
