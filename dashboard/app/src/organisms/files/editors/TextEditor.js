import React from 'react'
import styled from 'styled-components'
import { range } from '../../../utils/utils'
import { FETCH } from '../../../api/api'
import { ENDPOINTS } from '../../../api/endpoints'
import { useSearchParams } from 'react-router-dom'
import { Loading } from '../../../atoms/Loading'

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 5px;
    overflow-y: scroll;
`

const StyledTextArea = styled.textarea`
    border: 0;
    width: 100%;
    height: ${({ height }) => height * 30 + 'px'};
    line-height: 1.2;
    font-size: 20px;
    resize: none;
    white-space: pre;
    overflow-wrap: normal;
    overflow-x: scroll;
    padding: 0;
    overflow: scroll;
    &:focus {
        outline: none;
    }
`
const StyledLines = styled.div`
    font-size: 20px;
    display: flex;
    padding: 0;
    width: 50px;
    height: ${({ height }) => height * 30 + 'px'};
    line-height: 1.2;

    flex-direction: column;
    text-align: right;
    color: ${({ theme }) => theme.tertiary};
    /* border-right: 2px solid ${({ theme }) => theme.primary}; */
    &::-webkit-scrollbar {
        height: 0;
        width: 0;
    }
`

const StyledLoading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`

const Lines = ({ max }) => {
    const linesRef = React.useRef()

    return (
        <StyledLines ref={linesRef}>
            {range(1, max).map((line) => (
                <span key={line}>{line + 1}</span>
            ))}
        </StyledLines>
    )
}

export const TextEditor = ({ save }) => {
    const [value, setValue] = React.useState(false)
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        value !== false &&
            FETCH(ENDPOINTS.files.saveFile(searchParams.get('path')), {
                content: value,
            })
    }, [save])

    React.useEffect(() => {
        FETCH(ENDPOINTS.files.file(searchParams.get('path')))
            .then((data) => {
                setValue(data.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    if (loading)
        return (
            <StyledLoading>
                <Loading size={2} />
            </StyledLoading>
        )
    return (
        <StyledWrapper>
            <Lines
                max={value.split('\n').length}
                height={value.split('\n').length}
            />
            <StyledTextArea
                onKeyDown={(e) => {
                    if (e.key == 'Tab') {
                        e.preventDefault()
                        var start = e.target.selectionStart
                        var end = e.target.selectionEnd
                        e.target.value =
                            e.target.value.substring(0, start) +
                            '\t' +
                            e.target.value.substring(end)
                        e.target.selectionStart = e.target.selectionEnd =
                            start + 1
                    }
                }}
                preformate
                spellCheck={false}
                height={value.split('\n').length}
                onChange={(e) => {
                    setValue(e.target.value)
                }}
                value={value}
            />
        </StyledWrapper>
    )
}
