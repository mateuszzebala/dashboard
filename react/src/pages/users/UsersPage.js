import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Button } from '../../atoms/Button'
import { useMessage } from '../../utils/messages'

export const UsersPage = () => {
    const { newMessage } = useMessage()

    return <MainTemplate app={APPS.users}>
        <Button size={3} onClick={()=>{
            newMessage({
                text: 'SS',
            })
        }}>NEW MESSAGE</Button>
    </MainTemplate>
}
