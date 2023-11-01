import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Button } from '../../atoms/Button'

export const SessionsPage = () => {
    const [active, setActive] = React.useState(true)
    return <MainTemplate app={APPS.sessions}
        submenuChildren={
            <>
                <Button second={!active} onClick={()=>{setActive(true)}}>ACTIVE</Button>
                <Button second={active} onClick={()=>{setActive(false)}}>INACTIVE</Button>
            </>
        }
    >

    </MainTemplate>
}
