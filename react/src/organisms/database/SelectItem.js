import React from 'react'
import styled from 'styled-components'
import { Modal } from '../../atoms/Modal'
import { Input } from '../../atoms/Input'
import { FETCH } from '../../api/api'
import { endpoints } from '../../api/endpoints'
import { FaSearch } from 'react-icons/fa'

const StyledWrapper = styled.div``
const StyledInput = styled.div`
    display: inline-flex;
    padding: 10px 15px;
    border: 3px solid ${({ theme }) => theme.input.border};
    border-radius: 3px;
    width: 300px;
    gap: 20px;
    font-size: 18px;
    align-items: center;
    cursor: pointer;
    justify-content: flex-start;
`

const StyledItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 5px;
    max-height: 400px;
    overflow: scroll;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`

const StyledItem = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    border-radius: 3px;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    transition: background-color 0.2s;
    &:hover {
        background-color: #00000011;
    }
`

export const SelectItem = ({ modelName, value, setValue }) => {
    const [inputValue, setInputValue] = React.useState('')
    const [items, setItems] = React.useState([])
    const [openModal, setOpenModal] = React.useState(false)
    React.useEffect(() => {
        FETCH(
            endpoints.database.items(modelName, {
                query: inputValue,
                length: 20,
            })
        ).then((data) => {
            setItems(data.data.items)
        })
    }, [inputValue])
    return (
        <StyledWrapper>
            <StyledInput
                onClick={() => {
                    setOpenModal(true)
                }}
            >
                <FaSearch />{' '}
                <span>
                    {value
                        ? `${modelName} - ${value.str}`
                        : `Select ${modelName}`}
                </span>
            </StyledInput>
            <Modal
                open={openModal}
                setOpen={setOpenModal}
                title={`Select - ${modelName}`}
            >
                <Input
                    label={'SEARCH'}
                    value={inputValue}
                    setValue={setInputValue}
                />
                <StyledItems>
                    {items.map((item) => (
                        <StyledItem
                            onClick={() => {
                                setValue(item)
                                setOpenModal(false)
                            }}
                            key={item.pk}
                        >
                            {item.pk} - {item.str}
                        </StyledItem>
                    ))}
                </StyledItems>
            </Modal>
        </StyledWrapper>
    )
}
