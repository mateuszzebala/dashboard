import React from 'react'
import { Modal } from './Modal'
import { useModalForm } from '../utils/hooks'

export const ModalForm = () => {
    const { modalForm } = useModalForm()
    const [open, setOpen] = React.useState(!!modalForm.content)

    React.useEffect(() => {
        setOpen(!!modalForm.content)
    }, [modalForm])
    const { content: Content, icon, ...props } = modalForm

    return (
        <Modal icon={icon} open={open} setOpen={setOpen} {...props}>
            {Content && <Content setOpen={setOpen} {...props} />}
        </Modal>
    )
}
