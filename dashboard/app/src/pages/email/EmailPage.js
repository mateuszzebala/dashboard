import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Button } from '../../atoms/Button'
import { useLoading } from '../../utils/hooks'

export const EmailPage = () => {
    const loading = useLoading()
    const [mode1, setMode1] = React.useState(true)
    const [mode2, setMode2] = React.useState(true)
    return (
        <MainTemplate app={APPS.email}>
            <Button second onClick={()=>{
                setMode1(prev => !prev)
                loading({
                    show: mode1,
                    text: 'Saving in progress'
                })
            }}>OK1</Button>
            <Button second onClick={()=>{
                setMode2(prev => !prev)
                loading({
                    show: mode2,
                    text: 'Saving image in progress'
                })
            }}>OK2</Button>
        </MainTemplate>
    )
}
