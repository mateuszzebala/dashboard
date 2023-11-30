import React from 'react'
import styled from 'styled-components'
import { Switch } from '../../../atoms/Switch'
import { Typography } from '../../../atoms/Typography'
import { Theme } from '../../../atoms/Theme'
import { FETCH } from '../../../api/api'
import { ENDPOINTS } from '../../../api/endpoints'
import { FiPower } from 'react-icons/fi'
import { Button } from '../../../atoms/Button'
import { useTheme } from '../../../utils/hooks'

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
    const [configuration, setConfiguration] = React.useState({})
    const [theme] = useTheme()

    React.useEffect(() => {
        if (configuration['server.config.enable_server'] !== undefined) {
            FETCH(ENDPOINTS.settings.set(), {settings: JSON.stringify(configuration)})
        }
    }, [configuration])

    React.useEffect(() => {
        FETCH(ENDPOINTS.settings.get()).then((data) => {
            console.log(data.data)
            setConfiguration({
                'server.config.enable_server': data.data['server.config.enable_server'],
                'server.config.debug': data.data['server.config.debug'],
                'server.config.new_users': data.data['server.config.new_users'],
                'server.config.ddos_block': data.data['server.config.ddos_block'],
                'server.config.save_requests': data.data['server.config.save_requests'],
                'server.config.credientals': data.data['server.config.credientals'],
            })
        })
    }, [])

    return (
        <StyledWrapper>
            <StyledToggle>
                <Typography variant={'h4'}>PAGE</Typography>
                <Theme
                    value={{
                        primary: configuration['server.config.enable_server']
                            ? theme.success
                            : theme.error,
                    }}
                >
                    <Button
                        onClick={() => {
                            setConfiguration((prev) => ({
                                ...prev,
                                'server.config.enable_server': !prev['server.config.enable_server'],
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
                    value={configuration['server.config.debug']}
                    setValue={(val) => {
                        setConfiguration((prev) => ({
                            ...prev,
                            'server.config.debug': val(configuration['server.config.debug']),
                        }))
                    }}
                    size={2}
                />
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>NEW USERS</Typography>
                <Switch
                    value={configuration['server.config.new_users']}
                    setValue={(val) => {
                        setConfiguration((prev) => ({
                            ...prev,
                            'server.config.new_users': val(configuration['server.config.new_users']),
                        }))
                    }}
                    size={2}
                />
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>DDoS BLOCK</Typography>
                <Switch
                    value={configuration['server.config.ddos_block']}
                    setValue={(val) => {
                        setConfiguration((prev) => ({
                            ...prev,
                            'server.config.ddos_block': val(configuration['server.config.ddos_block']),
                        }))
                    }}
                    size={2}
                />
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>SAVE REQUESTS</Typography>
                <Switch
                    value={configuration['server.config.save_requests']}
                    setValue={(val) => {
                        setConfiguration((prev) => ({
                            ...prev,
                            'server.config.save_requests': val(configuration['server.config.save_requests']),
                        }))
                    }}
                    size={2}
                />
            </StyledToggle>
            {/*<StyledToggle>*/}
            {/*    <Typography variant={'h4'}>CREDENTIALS</Typography>*/}
            {/*    <Switch*/}
            {/*        value={configuration.credientals}*/}
            {/*        setValue={(val) => {*/}
            {/*            setConfiguration((prev) => ({*/}
            {/*                ...prev,*/}
            {/*                credientals: val(configuration.credientals),*/}
            {/*            }))*/}
            {/*        }}*/}
            {/*        size={2}*/}
            {/*    />*/}
            {/*</StyledToggle>*/}
        </StyledWrapper>
    )
}
