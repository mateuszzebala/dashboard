import styled from 'styled-components'
import React from 'react'
import useResizeObserver from 'use-resize-observer'
import String from 'string'
import { toBoolStr } from '../utils'
import terminalBell from '../../assets/audios/terminal_bell.wav'
import { terminalColors } from '../../data/terminalColors'

export class Vector2 {
    x = 0
    y = 0
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    getList() {
        return [this.x, this.y]
    }
}

export class Size {
    columns = 0
    rows = 0
    constructor(columns, rows) {
        this.columns = columns
        this.rows = rows
    }
    getList() {
        return [this.columns, this.rows]
    }
}

const TERMINAL_CODES = {
    BELL: '\x07',
    BACKSPACE: '\x1B[k',
    NEW_LINE: '\n',
    RETURN: '\r',
    CLEAR: '\x1b[2j',
    START: '\x1b[?1034h',
    MOVE_CURSOR_TO_0_0: '\x1b[h',
    ARROW_LEFT: '\x1b[D',
    ARROW_UP: '\x1b[A',
    ARROW_RIGHT: '\x1b[C',
    ARROW_DOWN: '\x1b[B',
}

const stringToTerminalCodesList = (string) => {
    //console.log({ string })
    const terminalCodes = []

    let charCounter = 0
    while (charCounter < string.length) {
        if (string[charCounter].toLowerCase() == '\x1b') {
            let csi = ''
            while (charCounter < string.length) {
                const ch = string[charCounter]
                csi += ch.toLowerCase()
                charCounter += 1
                if (String(ch).isAlpha()) {
                    break
                }
            }

            for (let codeKey of Object.keys(TERMINAL_CODES)) {
                const code = TERMINAL_CODES[codeKey]
                if (code.toLowerCase() == csi.toLowerCase()) {
                    terminalCodes.push({ code })
                    break
                }
            }

            const colorCode = csi.replace(';', ':').toLowerCase()
            if (Object.keys(terminalColors).includes(colorCode)) {
                Object.keys(terminalColors).forEach((code) => {
                    if (code == colorCode) {
                        const { type, color } = terminalColors[code]
                        //console.log({ type, color })
                    }
                })
            }

            continue
        } else if (string[charCounter] == '\x08') {
            // terminalCodes.push(TERMINAL_CODES.BACKSPACE)
        } else if (string[charCounter] == '\n') {
            terminalCodes.push(TERMINAL_CODES.NEW_LINE)
        } else if (string[charCounter] == '\x07') {
            terminalCodes.push(TERMINAL_CODES.BELL)
        } else {
            terminalCodes.push(string[charCounter])
        }
        charCounter += 1
    }

    return terminalCodes
}

export class TerminalGrid {
    cursorPosition = new Vector2(0, 0)
    constructor(size = new Size(40, 40), refresh = () => {}) {
        this.size = size
        this.refresh = refresh
        this.content = [this.getEmptyLine()]
    }
    createLineIfNotExists(y) {
        while (!this.content[y]) {
            this.content.push(this.getEmptyLine())
        }
    }
    setContentAtCursor(content) {
        const { x, y } = this.cursorPosition
        this.createLineIfNotExists(y)
        this.content[y][x] = content
        this.cursorFront()
    }
    interprateCode(code) {
        if (code.code) {
            code = code.code
            if (code == TERMINAL_CODES.BACKSPACE) {
                this.cursorBack()
                this.setContentAtCursor('')
                this.cursorBack()
            } else if (code == TERMINAL_CODES.CLEAR) {
                this.clear()
            } else if (code == TERMINAL_CODES.MOVE_CURSOR_TO_0_0) {
                this.setCursorPosition(0, 0)
            }
        } else {
            if (code == TERMINAL_CODES.NEW_LINE) {
                this.newLine()
            } else if (code == TERMINAL_CODES.BELL) {
                // const audio = new Audio(terminalBell)
                // audio.play()
            } else if (code == TERMINAL_CODES.RETURN) {
                this.cursorPosition.x = 0
            } else this.setContentAtCursor(code)
        }
    }
    input(content) {
        const reader = new FileReader()
        const classInstance = this
        reader.onload = function () {
            const arrayBuffer = reader.result
            const decoder = new TextDecoder('utf-8')
            const string = decoder.decode(arrayBuffer)
            stringToTerminalCodesList(string).forEach(classInstance.interprateCode.bind(classInstance))
            classInstance.refresh()
        }
        reader.readAsArrayBuffer(content)
    }

    getCharAt(x, y) {
        try {
            return this.content[y][x]
        } catch {
            return ''
        }
    }
    setCursorPosition(x, y) {
        this.cursorPosition = new Vector2(x, y)
    }

    cursorBack() {
        if (this.cursorPosition.x == 0) {
            this.setCursorPosition(this.size.columns, this.cursorPosition.y - 1)
        } else {
            this.setCursorPosition(this.cursorPosition.x - 1, this.cursorPosition.y)
        }
    }

    cursorFront() {
        if (this.cursorPosition.x == this.size.columns - 1) {
            this.setCursorPosition(0, this.cursorPosition.y + 1)
        } else {
            this.setCursorPosition(this.cursorPosition.x + 1, this.cursorPosition.y)
        }
    }

    returnCursor() {
        this.cursorPosition.x = 0
    }
    newLine() {
        while (this.cursorPosition.y >= this.content.length - 1) {
            this.content.push(this.getEmptyLine())
        }
        this.cursorPosition.y += 1
    }
    clear() {
        this.content = [this.getEmptyLine()]
        this.refresh()
    }
    getEmptyLine() {
        return Array.from({ length: this.size.columns }, () => '')
    }
    setContentAt(x, y, content) {
        while (y > this.content.length - 1) {
            this.content.push(this.getEmptyLine())
        }
        this.content[y][x] = content
    }
    resize(columns, rows) {
        const minColumns = Math.min(columns, this.size.columns)
        this.size = new Size(columns, rows)
        const newContent = [this.getEmptyLine()]
        for (let rowIndex = 0; rowIndex < this.content.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < minColumns; columnIndex++) {
                while (rowIndex > newContent.length - 1) {
                    newContent.push(this.getEmptyLine())
                }
                newContent[rowIndex][columnIndex] = this.getCharAt(columnIndex, rowIndex)
            }
        }

        this.content = newContent
    }
}

const StyledWrapper = styled.div`
    overflow: scroll;
    user-select: text;
    &::-webkit-scrollbar {
        height: 0;
    }
`

const StyledTerminalGrid = styled.div`
    max-width: 100%;
    height: auto;
`

const Row = styled.pre`
    display: flex;
    align-items: center;
    margin: 0;
    height: ${({ charHeight }) => charHeight}px;
    color: ${({ theme }) => theme.primary};
    font-size: 15px;
`

const StyledCursor = styled.span`
    background-color: ${({ theme }) => theme.primary};
`
const Cursor = ({ children }) => {
    return <StyledCursor>{children || <>&nbsp;&nbsp;</>}</StyledCursor>
}

export const TerminalGridComponent = ({ terminalGrid, charSize, reload, setReload, sendCommand, socketOpen }) => {
    const terminalGridRef = React.useRef()

    React.useEffect(() => {
        //console.log(terminalGrid.content)
    }, [reload])

    const handleResize = ({ width, height }) => {
        const columns = Math.ceil(width / charSize.width) - 1
        const rows = Math.ceil(height / charSize.height) - 1
        //console.log(columns, rows)
        terminalGrid.resize(columns, rows)
        //socketOpen && sendCommand(`\x1b[8;${height};${width}t`)
        setReload((prev) => prev + 1)
    }

    React.useEffect(() => {
        new ResizeObserver(() => {
            try {
                handleResize(terminalGridRef.current.getBoundingClientRect())
            } catch {
                //
            }
        }).observe(terminalGridRef.current)
    }, [terminalGridRef])

    return (
        <StyledWrapper>
            <StyledTerminalGrid onResize={handleResize} ref={terminalGridRef}>
                {terminalGrid.content.map((row, rowIndex) => (
                    <Row charHeight={charSize.height} key={rowIndex}>
                        {row.map((char, charIndex) => (rowIndex == terminalGrid.cursorPosition.y && charIndex == terminalGrid.cursorPosition.x ? <Cursor key={charIndex}>{char}</Cursor> : char ? char : ' '))}
                    </Row>
                ))}
            </StyledTerminalGrid>
        </StyledWrapper>
    )
}
