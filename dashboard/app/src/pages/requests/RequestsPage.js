import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Button } from '../../atoms/Button'
import { ContextMenu } from '../../atoms/ContextMenu'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiRename } from 'react-icons/bi'
import { BsFileZip } from 'react-icons/bs'

export const RequestsPage = () => {
    return (
        <MainTemplate app={APPS.requests}>
            <ContextMenu
                data={[
                    {
                        text: 'DELETE',
                        icon: <AiOutlineDelete />,
                        todo: () => {
                            alert()
                        },
                    },
                    {
                        text: 'RENAME',
                        icon: <BiRename />,
                        todo: () => {
                            alert()
                        },
                    },
                    {
                        text: 'ZIP',
                        icon: <BsFileZip />,
                        todo: () => {
                            alert()
                        },
                    },
                ]}
            >
                <Button>TEST</Button>
            </ContextMenu>
        </MainTemplate>
    )
}
