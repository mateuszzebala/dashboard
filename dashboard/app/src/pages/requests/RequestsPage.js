import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Button } from '../../atoms/Button'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'

export const RequestsPage = () => {
    return (
        <MainTemplate app={APPS.requests}>
            <Button onClick={()=>{
                FETCH(ENDPOINTS.database.possible_values('Permission', 'content_type')).then(data=>{
                    console.log(data)
                })
            }}>SIEMA</Button>
        </MainTemplate>
    )
}
