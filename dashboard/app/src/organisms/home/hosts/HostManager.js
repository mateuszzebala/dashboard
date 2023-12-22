import React from 'react'
import styled from 'styled-components'
import { FETCH } from '../../../api/api'
import { Host } from './Host'
import { Button } from '../../../atoms/Button'
import { Input } from '../../../atoms/inputs/Input'
import { Typography } from '../../../atoms/Typography'
import { FaPlus } from 'react-icons/fa'
import { useModalForm, useSettings } from '../../../utils/hooks'
import { Confirm } from '../../../atoms/modalforms/Confirm'
import { FiTrash } from 'react-icons/fi'
import { Prompt } from '../../../atoms/modalforms/Prompt'
import { MdOutlineNetworkCheck } from 'react-icons/md'
import { ENDPOINTS } from '../../../api/endpoints'

const StyledWrapper = styled.div`
    padding: 20px;
    box-shadow: 0 0 5px -3px ${({ theme }) => theme.primary};
    display: inline-flex;
    border-radius: 10px;
    flex-direction: column;
    gap: 20px;
`

const StyledHosts = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const StyledMenu = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`

export const HostManager = ({ name, hostKey }) => {
    const modalForm = useModalForm()
    const [hosts, setHosts] = React.useState([])
    const [settings] = useSettings()

    React.useEffect(()=>{
        setHosts(settings[hostKey])
    }, [])

    React.useEffect(()=>{
        hosts.length && FETCH(ENDPOINTS.settings.set(), {settings: JSON.stringify({
            [hostKey]: hosts
        })})
    }, [hosts])

    const handleAddHost = () => {
        modalForm({
            content: Prompt,
            title: 'ADD HOST',
            icon: <MdOutlineNetworkCheck/>,
            label: 'HOST',
            setButton: 'ADD',
            todo: (val) => {
                setHosts((prev) => [...prev, val])
            }
        })
    }

    return (
        <StyledWrapper>
            <StyledMenu>
                <Typography variant={'h3'}>{name.toUpperCase()}</Typography>
                <Button onClick={handleAddHost} size={1.2} icon={<FaPlus />} />
            </StyledMenu>
            <StyledHosts>
                {hosts && hosts.length > 0 ? (
                    hosts.map((host) => (
                        <Host
                            onClick={(e) => {
                                modalForm({
                                    content: Confirm,
                                    title: 'DELETE',
                                    text: `DELETE ${host} HOST?`,
                                    icon: <FiTrash />,
                                    todo: () => {
                                        host !== 'localhost' &&
                                            setHosts((prev) =>
                                                prev.filter(
                                                    (val) => val !== host
                                                )
                                            )
                                    },
                                })
                            }}
                            key={host}
                            name={host}
                        />
                    ))
                ) : (
                    <Typography variant={'span'}>
                        There are not allowed hosts
                    </Typography>
                )}
            </StyledHosts>
        </StyledWrapper>
    )
}
