import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { FiSettings } from 'react-icons/fi'
import { links } from '../../router/links'
import { ColorInput } from '../../atoms/ColorInput'
import { useTheme } from '../../utils/hooks'
import styled from 'styled-components'
import { Typography } from '../../atoms/Typography'
import { Switch } from '../../atoms/Switch'
import { Counter } from '../../atoms/Counter'
import { Button } from '../../atoms/Button'
import { HiXMark } from 'react-icons/hi2'
import { Theme } from '../../atoms/Theme'

const StyledRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
`

const StyledSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 500px);

    gap: 20px;
`

export const SettingsPage = () => {
    const [theme, setTheme] = useTheme()
    const [temp, setTemp] = React.useState(false)
    const [primaryColor, setPrimaryColor] = React.useState(theme.primary)
    const [secondaryColor, setSecondaryColor] = React.useState(theme.secondary)
    const [successColor, setSuccessColor] = React.useState(theme.success)
    const [accentColor, setAccentColor] = React.useState(theme.accent)
    const [errorColor, setErrorColor] = React.useState(theme.error)
    const [warningColor, setWarningColor] = React.useState(theme.warning)
    const [tertiaryColor, setTertiaryColor] = React.useState(theme.tertiary)

    React.useEffect(() => {
        setTheme({
            primary: primaryColor,
        })
    }, [primaryColor])

    return (
        <MainTemplate
            app={{
                name: 'Settings',
                icon: FiSettings,
                link: links.settings.index(),
            }}
        >
            <StyledWrapper>
                <StyledSection>
                    <span>THEME</span>
                    <StyledRow>
                        <Theme
                            value={{
                                button: {
                                    background: theme.primary,
                                    font: theme.secondary,
                                },
                            }}
                        >
                            <Button
                                onClick={() => {
                                    setPrimaryColor(theme.primary)
                                }}
                                circle
                                icon={<HiXMark />}
                            />
                        </Theme>
                        <ColorInput
                            value={primaryColor}
                            setValue={setPrimaryColor}
                        />
                        <Typography variant={'h2'}>PRIMARY</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Theme
                            value={{
                                button: {
                                    background: theme.secondary,
                                    font: theme.primary,
                                },
                            }}
                        >
                            <Button
                                onClick={() => {
                                    setSecondaryColor(theme.secondary)
                                }}
                                circle
                                icon={<HiXMark />}
                            />
                        </Theme>
                        <ColorInput
                            value={secondaryColor}
                            setValue={setSecondaryColor}
                        />
                        <Typography variant={'h2'}>SECONDARY</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Theme
                            value={{
                                button: {
                                    background: theme.tertiary,
                                    font: theme.secondary,
                                },
                            }}
                        >
                            <Button
                                onClick={() => {
                                    setTertiaryColor(theme.tertiary)
                                }}
                                circle
                                icon={<HiXMark />}
                            />
                        </Theme>
                        <ColorInput
                            value={tertiaryColor}
                            setValue={setTertiaryColor}
                        />
                        <Typography variant={'h2'}>TERTIARY</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Theme
                            value={{
                                button: {
                                    background: theme.accent,
                                    font: theme.primary,
                                },
                            }}
                        >
                            <Button
                                onClick={() => {
                                    setAccentColor(theme.accent)
                                }}
                                circle
                                icon={<HiXMark />}
                            />
                        </Theme>
                        <ColorInput
                            value={accentColor}
                            setValue={setAccentColor}
                        />
                        <Typography variant={'h2'}>ACCENT</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Theme
                            value={{
                                button: {
                                    background: theme.success,
                                    font: theme.primary,
                                },
                            }}
                        >
                            <Button
                                onClick={() => {
                                    setSuccessColor(theme.success)
                                }}
                                circle
                                icon={<HiXMark />}
                            />
                        </Theme>
                        <ColorInput
                            value={successColor}
                            setValue={setSuccessColor}
                        />
                        <Typography variant={'h2'}>SUCCESS</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Theme
                            value={{
                                button: {
                                    background: theme.error,
                                    font: theme.primary,
                                },
                            }}
                        >
                            <Button
                                onClick={() => {
                                    setErrorColor(theme.error)
                                }}
                                circle
                                icon={<HiXMark />}
                            />
                        </Theme>
                        <ColorInput
                            value={errorColor}
                            setValue={setErrorColor}
                        />
                        <Typography variant={'h2'}>ERROR</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Theme
                            value={{
                                button: {
                                    background: theme.warning,
                                    font: theme.primary,
                                },
                            }}
                        >
                            <Button
                                onClick={() => {
                                    setWarningColor(theme.warning)
                                }}
                                circle
                                icon={<HiXMark />}
                            />
                        </Theme>
                        <ColorInput
                            value={warningColor}
                            setValue={setWarningColor}
                        />
                        <Typography variant={'h2'}>WARNING</Typography>
                    </StyledRow>
                </StyledSection>
                <StyledSection>
                    <span>HOME</span>

                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>App List Widget</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>
                            Server Config Widget
                        </Typography>
                    </StyledRow>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>Logs Widget</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>Reload Logs</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>Hosts Widgets</Typography>
                    </StyledRow>
                </StyledSection>
                <StyledSection>
                    <span>DATABASE</span>

                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>
                            Show on right click
                        </Typography>
                    </StyledRow>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>JSON Export</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>XLSX Export</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>CSV Export</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Counter value={10} min={1} size={1.3} unit="rows" />
                        <Typography variant={'h3'}>
                            Default rows number
                        </Typography>
                    </StyledRow>
                </StyledSection>
                <StyledSection>
                    <span>TERMINAL</span>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>Auto Clear</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>Bookmarks</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>WINDOWS/UNIX</Typography>
                    </StyledRow>
                </StyledSection>
                <StyledSection>
                    <span>FILES</span>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>WINDOWS/UNIX</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>GRID/LIST</Typography>
                    </StyledRow>
                </StyledSection>
                <StyledSection>
                    <span>REQUESTS</span>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>SAVE REQUESTS</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Switch size={1.5} value={temp} setValue={setTemp} />
                        <Typography variant={'h3'}>
                            SAVE ADMIN REQUESTS
                        </Typography>
                    </StyledRow>
                </StyledSection>
            </StyledWrapper>
        </MainTemplate>
    )
}
