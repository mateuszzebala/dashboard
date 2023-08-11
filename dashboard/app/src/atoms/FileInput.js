import React from 'react'
import { FaUpload } from 'react-icons/fa'
import styled from 'styled-components'
import { Button } from './Button'
import { useModalForm } from '../utils/hooks'
import { FilePrompt } from './modalforms/FilePrompt'
import { ChooseDevice } from './modalforms/ChooseDevice'
import { SelectFile } from './modalforms/SelectFile'
import { centerEllipsis } from '../utils/utils'
import { MdComputer } from 'react-icons/md'
import { BsFolder2Open } from 'react-icons/bs'

const StyledWrapper = styled.div`
    display: inline-flex;
    width: 300px;
    flex-direction: column;
    align-items: stretch;
`

export const FileInput = ({ value, setValue }) => {
    const modalForm = useModalForm()
    return (
        <StyledWrapper>
            <Button
                onClick={() => {
                    modalForm({
                        content: ChooseDevice,
                        title: 'CHOOSE DEVICE',
                        icon: <MdComputer />,
                        todo: (device) => {
                            if (device === 'computer') {
                                modalForm({
                                    content: FilePrompt,
                                    title: 'UPLOAD',
                                    icon: <FaUpload />,
                                    todo: (val) => {
                                        setValue(val)
                                    },
                                })
                            } else {
                                modalForm({
                                    content: SelectFile,
                                    title: 'SELECT FILE',
                                    icon: <BsFolder2Open />,
                                    todo: (path) => {
                                        setValue(path)
                                    },
                                })
                            }
                        },
                    })
                }}
                width={'100%'}
                second
            >
                {value
                    ? centerEllipsis(value.name ? value.name : value, 15)
                    : 'UPLOAD'}
            </Button>
        </StyledWrapper>
    )
}
