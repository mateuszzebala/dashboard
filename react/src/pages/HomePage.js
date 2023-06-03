import React from 'react'
import { MainTemplate } from '../templates/MainTemplate'
import { MultipleSelect } from '../atoms/MultipleSelect'

export const HomePage = () => {
    const [value, setValue] = React.useState([])

    return (
        <MainTemplate title={'HOME'}>
            <MultipleSelect
                value={value}
                setValue={setValue}
                data={{
                    a: 2,
                    b: 5,
                    c: 6,
                    d: 6,
                    e: 6,
                    f: 6,
                }}
            />
            <br />
            {value}
        </MainTemplate>
    )
}
