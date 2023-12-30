import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { FiSettings } from 'react-icons/fi'
import { LINKS } from '../../router/links'
import { Button, ColorInput, Counter, Select, Switch, Theme, Typography } from '../../atoms'
import { useSettings, useTheme } from '../../utils/hooks'
import styled from 'styled-components'
import { HiXMark } from 'react-icons/hi2'
import { theme as originalTheme } from '../../theme/theme'
import { LuComponent, LuSave } from 'react-icons/lu'
import { MdOutlineStyle } from 'react-icons/md'
import { useSearchParams } from 'react-router-dom'
import { APPS } from '../../apps/apps'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'

const StyledRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
    h2,
    h3 {
        font-weight: 500;
        white-space: nowrap;
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

const ColorProp = ({ setColors, colorName, colors }) => {
    return (
        <StyledRow>
            <Theme
                value={{
                    primary: originalTheme[colorName],
                }}
            >
                <Button
                    onClick={() => {
                        setColors((prev) => ({
                            ...prev,
                            [colorName]: originalTheme[colorName],
                        }))
                    }}
                    circle
                    icon={<HiXMark />}
                />
            </Theme>
            <ColorInput
                value={colors[colorName]}
                setValue={(val) => {
                    setColors((prev) => ({ ...prev, [colorName]: val }))
                }}
            />
            <Typography variant={'h3'}>{colorName.toUpperCase()}</Typography>
        </StyledRow>
    )
}

const SettingsByPage = {
    colors: ({ colors, setColors, value, setValue }) => (
        <StyledSection>
            <ColorProp setColors={setColors} colors={colors} colorName={'primary'} />
            <ColorProp setColors={setColors} colors={colors} colorName={'secondary'} />
            <ColorProp setColors={setColors} colors={colors} colorName={'tertiary'} />
            <ColorProp setColors={setColors} colors={colors} colorName={'quaternary'} />
            <ColorProp setColors={setColors} colors={colors} colorName={'error'} />
            <ColorProp setColors={setColors} colors={colors} colorName={'warning'} />
            <ColorProp setColors={setColors} colors={colors} colorName={'success'} />
            <ColorProp setColors={setColors} colors={colors} colorName={'accent'} />

            <StyledSection>
                <StyledRow>
                    <Select
                        label={'FONT FAMILY'}
                        emptyName="FONT FAMILY"
                        canBeNull={false}
                        second
                        setValue={(val) => {
                            setValue((prev) => ({
                                ...prev,
                                'dashboard.style.fontFamily': val,
                            }))
                        }}
                        value={value['dashboard.style.fontFamily']}
                        data={{
                            Rubik: 'Rubik',
                            Montserrat: 'Montserrat',
                            Ubuntu: 'Ubuntu',
                            'Fira Mono': 'Fira Mono',
                            'Jetbrains Mono': 'Jetbrains Mono',
                            'Ubuntu Mono': 'Ubuntu Mono',
                        }}
                    />
                    <Typography variant={'h3'}>FONT FAMILY</Typography>
                </StyledRow>
                <StyledRow>
                    <Select
                        label={'FONT FAMILY MONO'}
                        emptyName="FONT FAMILY MONO"
                        canBeNull={false}
                        second
                        setValue={(val) => {
                            setValue((prev) => ({
                                ...prev,
                                'dashboard.style.fontFamilyMono': val,
                            }))
                        }}
                        value={value['dashboard.style.fontFamilyMono']}
                        data={{
                            'Fira Mono': 'Fira Mono',
                            'Ubuntu Mono': 'Ubuntu Mono',
                            'Jetbrains Mono': 'Jetbrains Mono',
                        }}
                    />
                    <Typography variant={'h3'}>MONO FONT FAMILY</Typography>
                </StyledRow>
            </StyledSection>
        </StyledSection>
    ),
    dashboard: ({ value, setValue }) => (
        <StyledSection>
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.dashboards_menu'} text={'Show Dashboards Menu'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.polish_flag'} text={'Show Polish Flag'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.topbar_username'} text={'Show Username In TopBar'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.topbar_submenu_toggler'} text={'Show Submenu Toggler'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.topbar_app_icon'} text={'Show TopBar app icon'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.leftbar_app_icons'} text={'Show Leftbar app icons'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.leftbar_arrow_icons'} text={'Show Leftbar arrow icons'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.save_dashboard_requests'} text={'Save Dashboard Requests'} />
            <span>APPS</span>
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.app.database'} text={'Database App'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.app.users'} text={'Users App'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.app.files'} text={'Files App'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.app.editor'} text={'Editor App'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.app.terminal'} text={'Terminal App'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.app.email'} text={'Email App'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.app.requests'} text={'Requests App'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.app.sessions'} text={'Sessions App'} />
            <SwitchSetting value={value} setValue={setValue} prop={'dashboard.app.statistics'} text={'Statistics App'} />
        </StyledSection>
    ),
    home: ({ value, setValue }) => (
        <StyledSection>
            <SwitchSetting value={value} setValue={setValue} prop={'home.app_list_widget'} text={'App List Widget'} />
            <SwitchSetting value={value} setValue={setValue} prop={'home.server_config_widget'} text={'Server Config Widget'} />
            <SwitchSetting value={value} setValue={setValue} prop={'home.logs_widget'} text={'Logs Widget'} />
            <SwitchSetting value={value} setValue={setValue} prop={'home.reload_logs'} text={'Reload Logs'} />
            <SwitchSetting value={value} setValue={setValue} prop={'home.hosts_widgets'} text={'Hosts Widgets'} />
            <SwitchSetting value={value} setValue={setValue} prop={'home.informations_widget'} text={'Informations Widget'} />
        </StyledSection>
    ),
    database: ({ value, setValue }) => (
        <StyledSection>
            <SwitchSetting value={value} setValue={setValue} prop={'database.show_on_right_click'} text={'Show on right click'} />
            <SwitchSetting value={value} setValue={setValue} prop={'database.show_all_columns'} text={'Show all columns'} />
            <SwitchSetting value={value} setValue={setValue} prop={'database.export.json'} text={'JSON Export'} />
            <SwitchSetting value={value} setValue={setValue} prop={'database.export.xlsx'} text={'XLSX Export'} />
            <SwitchSetting value={value} setValue={setValue} prop={'database.export.csv'} text={'CSV Export'} />
            <StyledRow>
                <Counter
                    value={value['database.default_number_of_rows'] || 10}
                    setValue={(val) => {
                        try {
                            setValue((prev) => ({
                                ...prev,
                                'database.default_number_of_rows': val(prev['database.default_number_of_rows'] || 10),
                            }))
                        } catch {
                            setValue((prev) => ({
                                ...prev,
                                'database.default_number_of_rows': val,
                            }))
                        }
                    }}
                    min={1}
                    size={1.3}
                    unit="rows"
                />
                <Typography variant={'h3'}>DEFAULT NUMBER OF ROWS</Typography>
            </StyledRow>
        </StyledSection>
    ),
    terminal: ({ value, setValue }) => (
        <StyledSection>
            <SwitchSetting value={value} setValue={setValue} prop={'terminal.auto_clear'} text={'AUTO CLEAR'} />
            <SwitchSetting value={value} setValue={setValue} prop={'terminal.bookmarks'} text={'BOOKMARKS'} />
            <StyledRow>
                <Select
                    emptyName="INTERPRETER"
                    canBeNull={false}
                    second
                    setValue={(val) => {
                        setValue((prev) => ({
                            ...prev,
                            'terminal.sh_type': val,
                        }))
                    }}
                    value={value['terminal.sh_type']}
                    data={{
                        zsh: 'ZSH',
                        bash: 'BASH',
                        sh: 'SH',
                        cmd: 'CMD',
                    }}
                />
                <Typography variant={'h3'}>INTERPRETER</Typography>
            </StyledRow>
        </StyledSection>
    ),
    requests: ({ value, setValue }) => (
        <StyledSection>
            <SwitchSetting value={value} setValue={setValue} prop={'requests.save_requests'} text={'SAVE REQUESTS'} />
            <SwitchSetting value={value} setValue={setValue} prop={'requests.save_admin_requests'} text={'SAVE ADMIN REQUESTS'} />
        </StyledSection>
    ),
}

export const SettingsPage = () => {
    const [theme, updateTheme] = useTheme()
    const [searchParams, setSearchParams] = useSearchParams()
    const [settings, setSettings] = useSettings()
    const [value, setValue] = React.useState({})
    const [page, setPage] = React.useState(searchParams.get('page') || 'home')
    const [saved, setSaved] = React.useState(true)
    const [initValue, setInitValue] = React.useState({})
    const [saveLoading, setSaveLoading] = React.useState(false)

    React.useEffect(() => {
        FETCH(ENDPOINTS.settings.get()).then((data) => {
            setValue(data.data)
            setInitValue(data.data)
        })
    }, [])

    const [colors, setColors] = React.useState({
        primary: theme.primary,
        secondary: theme.secondary,
        success: theme.success,
        quaternary: theme.quaternary,
        accent: theme.accent,
        error: theme.error,
        warning: theme.warning,
        tertiary: theme.tertiary,
    })

    React.useEffect(() => {
        if (searchParams.get('page') !== page) {
            setSearchParams((prev) => ({ ...prev, page }))
        }
    }, [page])

    React.useEffect(() => {
        if (searchParams.get('page') !== page) {
            if (!SettingsByPage[page]) {
                setPage('home')
            } else setPage(searchParams.get('page'))
        }
    }, [searchParams])

    React.useEffect(() => {
        updateTheme(colors)
    }, [colors])

    React.useEffect(() => {
        if (Object.keys(value).some((key) => value[key] !== initValue[key])) {
            setSaved(false)
        } else {
            setSaved(true)
        }
    }, [value])

    return (
        <MainTemplate
            title={page.toUpperCase()}
            app={{
                name: 'Settings',
                icon: FiSettings,
                link: LINKS.settings.index(),
            }}
            submenuChildren={
                <>
                    <Theme
                        value={{
                            ...theme,
                            primary: saved ? theme.success : theme.error,
                        }}
                    >
                        <Button
                            loading={saveLoading}
                            subContent="SAVE"
                            onClick={() => {
                                setSaveLoading(true)
                                FETCH(ENDPOINTS.settings.set(), {
                                    settings: JSON.stringify(value),
                                }).then(() => {
                                    setSaved(true)
                                    setSaveLoading(false)
                                    FETCH(ENDPOINTS.settings.get()).then((data) => {
                                        setSettings(data.data)
                                    })
                                })
                            }}
                            icon={<LuSave />}
                            size={1.4}
                        />
                    </Theme>
                    |
                    <Button
                        onClick={() => {
                            setPage('style')
                        }}
                        subContent="STYLE"
                        second={page !== 'style'}
                        icon={<MdOutlineStyle />}
                        size={1.4}
                    ></Button>
                    <Button
                        onClick={() => {
                            setPage('dashboard')
                        }}
                        subContent="DASHBO..."
                        second={page !== 'dashboard'}
                        icon={<LuComponent />}
                        size={1.4}
                    ></Button>
                    |
                    {Object.values(APPS)
                        .filter((app) => settings[`dashboard.app.${app.name.toLowerCase()}`] !== false)
                        .filter((app) => SettingsByPage[app.name.toLowerCase()])
                        .map((app) => (
                            <Button
                                key={app.name}
                                onClick={() => {
                                    setPage(app.name.toLowerCase())
                                }}
                                subContent={app.name.toUpperCase()}
                                second={page !== app.name.toLowerCase()}
                                icon={<app.icon />}
                                size={1.4}
                            />
                        ))}
                </>
            }
        >
            <StyledWrapper>
                {page === 'style' && <SettingsByPage.colors colors={colors} setColors={setColors} value={value} setValue={setValue} />}
                {page === 'dashboard' && <SettingsByPage.dashboard value={value} setValue={setValue} />}
                {page === 'home' && <SettingsByPage.home value={value} setValue={setValue} />}
                {page === 'database' && <SettingsByPage.database value={value} setValue={setValue} />}
                {page === 'terminal' && <SettingsByPage.terminal value={value} setValue={setValue} />}
                {page === 'requests' && <SettingsByPage.requests value={value} setValue={setValue} />}
            </StyledWrapper>
        </MainTemplate>
    )
}
