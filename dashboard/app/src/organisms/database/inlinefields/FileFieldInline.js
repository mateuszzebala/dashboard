import React from 'react'
import { useModalForm } from '../../../utils/hooks'
import { useNavigate } from 'react-router'
import { EditorChooser } from '../../../atoms/modalforms/EditorChooser'
import { BiEditAlt } from 'react-icons/bi'
import { LINKS } from '../../../router/links'
import { fieldToString } from '../../../utils/utils'
import { Button } from '../../../atoms/Button'
import { centerEllipsis } from '../../../utils/utils'

export const FileFieldInline = ({ value, type }) => {
    const modalForm = useModalForm()
    const navigate = useNavigate()

    if (!value) return 'None'

    return (
        <Button
            second
            onClick={() => {
                modalForm({
                    content: EditorChooser,
                    icon: <BiEditAlt />,
                    title: 'CHOOSE EDITOR TYPE',
                    todo: (editorType) => {
                        navigate(LINKS.editor.edit(value, editorType))
                    },
                })
            }}
        >
            {centerEllipsis(fieldToString(value, type), 50)}
        </Button>
    )
}
