import React from 'react'
import styled from 'styled-components'
import { Switch } from '../../../atoms/Switch'
import { Typography } from '../../../atoms/Typography'
import { Theme } from '../../../atoms/Theme'
import { FETCH } from '../../../api/api'
import { ENDPOINTS } from '../../../api/endpoints'
import { theme } from '../../../theme/theme'
import { FiPower } from 'react-icons/fi'
import { Button } from '../../../atoms/Button'

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

    React.useEffect(() => {
        if (configuration.enable_server !== undefined) {
            FETCH(ENDPOINTS.home.configuration(), {
                method: 'PATCH',
                ...configuration,
            })
        }
    }, [configuration])

    React.useEffect(() => {
        FETCH(ENDPOINTS.home.configuration()).then((data) => {
            setConfiguration(data.data)
        })
    }, [])

    return (
        <StyledWrapper>
            <StyledToggle>
                <Typography variant={'h4'}>PAGE</Typography>
                <Theme
                    value={{
                        button: {
                            background: configuration.enable_server
                                ? theme.success
                                : theme.error,
                            font: theme.secondary,
                        },
                    }}
                >
                    <Button
                        onClick={() => {
                            setConfiguration((prev) => ({
                                ...prev,
                                enable_server: !prev.enable_server,
                            }))
                        }}
                        icon={<FiPower />}
                        size={2}
                    />
                </Theme>
            </StyledToggle>
            {/* <StyledToggle>
                <Typography variant={'h4'}>PAGE</Typography>
                <Theme
                    value={{
                        switch: {
                            on: theme.success,
                            off: theme.error,
                            dot: theme.secondary,
                        },
                    }}
                >
                    <Switch
                        value={configuration.enable_server}
                        setValue={(val) => {
                            setConfiguration((prev) => ({
                                ...prev,
                                enable_server: val(configuration.enable_server),
                            }))
                            newMessage({
                                text: val(configuration.enable_server)
                                    ? 'The page is now on'
                                    : 'The page is now down',
                                success: val(configuration.enable_server),
                                error: !val(configuration.enable_server),
                            })
                        }}
                        size={2}
                    />
                </Theme>
            </StyledToggle> */}
            <StyledToggle>
                <Typography variant={'h4'}>DEBUG</Typography>
                <Switch
                    value={configuration.debug}
                    setValue={(val) => {
                        setConfiguration((prev) => ({
                            ...prev,
                            debug: val(configuration.debug),
                        }))
                    }}
                    size={2}
                />
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>NEW USERS</Typography>
                <Switch
                    value={configuration.new_users}
                    setValue={(val) => {
                        setConfiguration((prev) => ({
                            ...prev,
                            new_users: val(configuration.new_users),
                        }))
                    }}
                    size={2}
                />
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>DDoS BLOCK</Typography>
                <Switch
                    value={configuration.ddos_block}
                    setValue={(val) => {
                        setConfiguration((prev) => ({
                            ...prev,
                            ddos_block: val(configuration.ddos_block),
                        }))
                    }}
                    size={2}
                />
            </StyledToggle>
            <StyledToggle>
                <Typography variant={'h4'}>SAVE REQUESTS</Typography>
                <Switch
                    value={configuration.save_requests}
                    setValue={(val) => {
                        setConfiguration((prev) => ({
                            ...prev,
                            save_requests: val(configuration.save_requests),
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
