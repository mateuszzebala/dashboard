import React from 'react'
import styled from 'styled-components'
import { FETCH } from '../../../api/api'
import { Host } from './Host'
import { Button } from '../../../atoms/Button'
import { Input } from '../../../atoms/Input'
import { Typography } from '../../../atoms/Typography'
import { FaPlus } from 'react-icons/fa'
import { useModalForm } from '../../../utils/hooks'
import { Confirm } from '../../../atoms/Confirm'
import { FiTrash } from 'react-icons/fi'

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
`

export const HostSelect = ({ name, endpoint }) => {
    const { ask } = useModalForm()
    const [hosts, setHosts] = React.useState([])
    const [inputValue, setInputValue] = React.useState('')

    React.useEffect(() => {
        FETCH(endpoint).then((data) => {
            setHosts(data.data.hosts)
        })
    }, [])

    React.useEffect(() => {
        if (hosts && hosts.length !== 0) {
            FETCH(endpoint, {
                method: 'PATCH',
                hosts: hosts,
            })
        }
    }, [hosts])

    const handleAddHost = () => {
        setHosts((prev) => {
            if (!inputValue) return prev
            const newHosts = prev.slice()
            newHosts.push(inputValue)
            setInputValue('')
            return newHosts
        })
    }

    return (
        <StyledWrapper>
            <Typography variant={'h3'}>{name.toUpperCase()}</Typography>
            <StyledMenu>
                <Input
                    label="ADD"
                    value={inputValue}
                    setValue={setInputValue}
                    onKeyUp={(e) => {
                        e.key === 'Enter' && handleAddHost()
                    }}
                />
                <Button onClick={handleAddHost} icon={<FaPlus />} />
            </StyledMenu>
            <StyledHosts>
                {hosts && hosts.length > 0 ? (
                    hosts.map((host) => (
                        <Host
                            onContextMenu={(e) => {
                                e.preventDefault()
                                ask({
                                    content: Confirm,
                                    title: 'DELETE',
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
                    <Typography variant={'h4'}>
                        There are not allowed hosts
                    </Typography>
                )}
            </StyledHosts>
        </StyledWrapper>
    )
}
