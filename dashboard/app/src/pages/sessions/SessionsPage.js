import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { MultipleSelect } from '../../atoms/MultipleSelect'

export const SessionsPage = () => {
    const [value, setValue] = React.useState([])
    return (
        <MainTemplate app={APPS.sessions}>
            <MultipleSelect
                data={{
                    user1: 'Mateusz',
                    user2: 'Kamil',
                    user3: 'Paweł',
                    user4: 'Emilia',
                    user5: 'Anna',
                    user6: 'Roksana',
                    user7: 'Bożena',
                    user8: 'Kornelia',
                    user9: 'Maks',
                    user10: 'Piotrek',
                    user11: 'Roksana',
                    user12: 'Filip',
                    user13: 'Bartek',
                    user14: 'Łukasz',
                    user15: 'Eliot',
                }}
                value={value}
                setValue={setValue}
            ></MultipleSelect>
        </MainTemplate>
    )
}
