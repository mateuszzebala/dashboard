import React from 'react'
import styled from 'styled-components'
import { FETCH } from '../../../api/api'
import { endpoints } from '../../../api/endpoints'
import { Host } from './Host'
import { Button } from '../../../atoms/Button'
import { Input } from '../../../atoms/Input'
import { Typography } from '../../../atoms/Typography'
import { FaPlus } from 'react-icons/fa'

const StyledWrapper = styled.div`
    padding: 20px;
    box-shadow: 0 0 5px -3px black;
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

export const AllowedHosts = () => {
    const [hosts, setHosts] = React.useState([])
    const [inputValue, setInputValue] = React.useState('')
    React.useEffect(() => {
        FETCH(endpoints.home.hosts()).then((data) => {
            setHosts(data.data.hosts)
        })
    }, [])

    React.useEffect(() => {
        if (hosts.length !== 0) {
            FETCH(endpoints.home.hosts(), {
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
            <Typography variant={'h3'}>ALLOWED HOSTS</Typography>
            <StyledMenu>
                <Input
                    label="ADD HOSTNAME"
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
                                setHosts((prev) =>
                                    prev.filter((val) => val !== host)
                                )
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
