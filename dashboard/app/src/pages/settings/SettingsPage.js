import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { FiSettings } from 'react-icons/fi'
import { LINKS } from '../../router/links'
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

    text-transform: uppercase;
    h2,
    h3 {
        font-weight: 500;
    }
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

const SwitchSetting = ({ value, setValue, prop, text }) => {
    return (
        <StyledRow>
            <Switch
                size={1.5}
                value={value[prop]}
                setValue={(val) => {
                    setValue((prev) => ({ ...prev, [prop]: val(value[prop]) }))
                }}
            />
            <Typography variant={'h3'}>{text}</Typography>
        </StyledRow>
    )
}

export const SettingsPage = () => {
    const [theme, setTheme] = useTheme()
    const [value, setValue] = React.useState({})
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
                link: LINKS.settings.index(),
            }}
            submenuChildren={<Button>SAVE</Button>}
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
                    <span>MAIN</span>
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'dashboards_menu'}
                        text={'Show Dashboards Menu'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'topbar_username'}
                        text={'Show Username In TopBar'}
                    />

                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'topbar_app_icon'}
                        text={'Show TopBar app icon'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'leftbar_technology_icons'}
                        text={'Show Leftbar technology icons'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'leftbar_app_icons'}
                        text={'Show Leftbar app icons'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'leftbar_arrow_icons'}
                        text={'Show Leftbar arrow icons'}
                    />
                </StyledSection>
                <StyledSection>
                    <span>HOME</span>
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'app_list_widget'}
                        text={'App List Widget'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'server_config_widget'}
                        text={'Server Config Widget'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'logs_widget'}
                        text={'Logs Widget'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'reload_logs'}
                        text={'Reload Logs'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'hosts_widgets'}
                        text={'Hosts Widgets'}
                    />
                </StyledSection>
                <StyledSection>
                    <span>DATABASE</span>
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'item_show_right_click'}
                        text={'Show on right click'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'json_export'}
                        text={'JSON Export'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'xlsx_export'}
                        text={'XLSX Export'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'csv_export'}
                        text={'CSV Export'}
                    />
                    <StyledRow>
                        <Counter value={10} min={1} size={1.3} unit="rows" />
                        <Typography variant={'h3'}>
                            Default rows number
                        </Typography>
                    </StyledRow>
                </StyledSection>
                <StyledSection>
                    <span>TERMINAL</span>
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'auto_clear'}
                        text={'Auto Clear'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'bookmarks_terminal'}
                        text={'Bookmarks'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'windows_unix_terminal'}
                        text={'Windows/Unix'}
                    />
                </StyledSection>
                <StyledSection>
                    <span>FILES</span>
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'windows_unix_files'}
                        text={'WINDOWS/UNIX'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'grid_list_files'}
                        text={'GRID/LIST'}
                    />
                </StyledSection>
                <StyledSection>
                    <span>REQUESTS</span>
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'save_requests'}
                        text={'SAVE REQUESTS'}
                    />
                    <SwitchSetting
                        value={value}
                        setValue={setValue}
                        prop={'save_admin'}
                        text={'SAVE ADMIN'}
                    />
                </StyledSection>
            </StyledWrapper>
        </MainTemplate>
    )
}
