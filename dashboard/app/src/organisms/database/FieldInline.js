import React from 'react'
import { fieldToString } from '../../utils/utils'
import { FileFieldInline } from './inlinefields/FileFieldInline'

export const FieldInline = ({ type, value }) => {
    if (type === 'FileField')
        return <FileFieldInline value={value} type={type} />

    return <span>{fieldToString(value, type)}</span>
}
