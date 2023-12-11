import React from 'react'
import { Modal } from './Modal'
import { ModalFormContext } from '../utils/hooks'
import styled from 'styled-components'
import { FaDatabase, FaEdit, FaTerminal } from 'react-icons/fa'
import { IoBagOutline, IoBrowsersOutline } from 'react-icons/io5'
import { BsTerminal } from 'react-icons/bs'
import { objectEquals, range } from '../utils/utils'

const StyledTaskBar = styled.div`
    position: fixed;
    top: 50%;
    right: 20px;
    background-color: ${({theme})=>theme.primary};
    width: 60px;
    z-index: 20000;
    border-radius: 15px;
    box-shadow: 0 0 10px -5px ${({theme})=>theme.primary};
    transform: translateY(-50%);
    display: flex;
    box-sizing: content-box;
    flex-direction: column;
`

const StyledTaskBarIcon = styled.button`
    background-color: transparent;
    border: 0;
    cursor: pointer;
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${({theme})=>theme.secondary};
    font-size: 25px;
    svg{
        transition: transform 0.3s;
    }
    :hover svg{
        transform: scale(0.8);
    }
`

const ModalFormWindow = ({form, setModalForm, zIndex}) => {
    const [open, setOpen] = React.useState(!!form.content)
    const [minimize, setMinimize] = React.useState(false)
    const {content: Content, icon, onExit = () => {}, ...props} = form

    React.useEffect(()=>{
        !open && setModalForm(prev => prev.filter(f => f.title !== form.title))
        !open && onExit()
    }, [open])


    return (
        <Modal minimize={minimize} setMinimize={setMinimize} icon={icon} open={open} setOpen={setOpen} {...props}>
            {Content && <Content setOpen={setOpen} {...props} />}
        </Modal>    
    )
}

export const ModalForm = () => {
    const [modalForm, setModalForm] = React.useContext(ModalFormContext)
    return (
        <>
            {/* <StyledTaskBar>
                {range(0, modalForm.length - 1).map(index => {
                    const form = modalForm[index]
                    return (
                        <StyledTaskBarIcon onClick={()=>{
                            setModalForm(prev => [...prev.filter(f => f.title !== form.title), form])
                        }} key={form.title}>{form.icon}</StyledTaskBarIcon>
                    )
                })}
            </StyledTaskBar> */}
            {range(0, modalForm.length - 1).map(index => {
                const form = modalForm[index]
                return (
                    <ModalFormWindow zIndex={index} setModalForm={setModalForm} key={form.title} form={form}/>
                )
            })}
        </>
    )
}
