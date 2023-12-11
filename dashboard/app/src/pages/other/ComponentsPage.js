import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { FaReact } from 'react-icons/fa'
import { LINKS } from '../../router/links'
import { Button } from '../../atoms/Button'
import styled from 'styled-components'
import { Input } from '../../atoms/Input'
import { Select } from '../../atoms/Select'
import { MultipleSelect } from '../../atoms/MultipleSelect'
import { Checkbox } from '../../atoms/Checkbox'
import { Radio } from '../../atoms/Radio'
import { Paginator } from '../../atoms/Paginator'
import { Switch } from '../../atoms/Switch'
import { Typography } from '../../atoms/Typography'
import { SwitchWithNull } from '../../atoms/SwitchWithNull'
import { Counter } from '../../atoms/Counter'
import { ColorInput } from '../../atoms/ColorInput'
import { Link } from '../../atoms/Link'
import { Field, HeaderRow, Row, Table } from '../../atoms/Table'
import { Range } from '../../atoms/Range'
import { Message } from '../../atoms/Message'
import { Loading } from '../../atoms/Loading'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px;


`

const StyledRow = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
`

export const ComponentsPage = () => {
    const [stringValue, setStringValue] = React.useState('')
    const [arrayValue, setArrayValue] = React.useState([])
    const [numberValue, setNumberValue] = React.useState(1)
    const [colorValue, setColorValue] = React.useState('#fff')
    const [boolValue, setBoolValue] = React.useState(true)

    return (
        <MainTemplate app={{
            name: 'Components',
            icon: FaReact,
            link: LINKS.other.components()
        }}>
            <StyledWrapper>
                <StyledRow>
                    <Button>Button</Button>
                    <Button second>Button</Button>
                    <Button loading>Button</Button>
                    <Button icon={<FaReact/>}></Button>
                    <Button circle icon={<FaReact/>}>Button</Button>
                </StyledRow>
                <StyledRow>
                    <Loading size={3} />
                </StyledRow>
                <StyledRow>
                    <Input label={'INPUT'} value={stringValue} setValue={setStringValue}/>
                    <Input icon={<FaReact/>} label={'INPUT'} value={stringValue} setValue={setStringValue}/>
                </StyledRow>
                <StyledRow>
                    <Input label={'TEXTAREA'} textarea value={stringValue} setValue={setStringValue}/>
                </StyledRow>
                <StyledRow>
                    <Select value={stringValue} setValue={setStringValue} data={{
                        a: 'A',
                        b: 'B',
                        c: 'C',
                        d: 'D'
                    }}/>
                    <Select asButton value={stringValue} setValue={setStringValue} data={{
                        a: 'A',
                        b: 'B',
                        c: 'C',
                        d: 'D'
                    }}>Select Button</Select>
                    <MultipleSelect value={arrayValue} setValue={setArrayValue} data={{
                        a: 'A',
                        b: 'B',
                        c: 'C',
                        d: 'D'
                    }}/>
                </StyledRow>
                <StyledRow>
                    <Checkbox value={boolValue} setValue={setBoolValue}/>
                    <Radio checked={boolValue}/>
                    <Radio checked={!boolValue}/>
                    <Switch value={boolValue} setValue={setBoolValue}/>
                    <SwitchWithNull value={boolValue} setValue={setBoolValue}/>
                </StyledRow>
                <StyledRow>
                    <Paginator value={numberValue} setValue={setNumberValue} pages={10}/>
                    |
                    <Paginator value={numberValue} setValue={setNumberValue} minimum pages={10}/>
                </StyledRow>
                <StyledRow>
                    <Typography variant={'h1'}>Typography</Typography>
                    <Typography variant={'h4'}>Typography</Typography>
                    <Typography variant={'p'}>Typography</Typography>
                </StyledRow>
                <StyledRow>
                    <Counter value={numberValue} setValue={setNumberValue} unit='unit' />
                </StyledRow>
                <StyledRow>
                    <ColorInput value={colorValue} setValue={setColorValue} />
                </StyledRow>
                <StyledRow>
                    <Link to={'#'} animation={false}>Link</Link>
                    <Link to={'#'} animation>Link</Link>
                </StyledRow>
                <StyledRow>
                    <Table>
                        <HeaderRow>
                            <Field>A</Field>
                            <Field>B</Field>
                        </HeaderRow>
                        <Row>
                            <Field>C</Field>
                            <Field>D</Field>
                        </Row>
                        <Row>
                            <Field>E</Field>
                            <Field>F</Field>
                        </Row>
                    </Table>
                </StyledRow>
                <StyledRow>
                    <Range value={numberValue} setValue={setNumberValue} min={0} max={30}/>
                </StyledRow>
                <StyledRow>
                    <Message onClose={()=>{}} text='MESSAGE'/>
                    <Message onClose={()=>{}} text='MESSAGE' error/>
                    <Message onClose={()=>{}} text='MESSAGE' success/>
                    <Message onClose={()=>{}} text='MESSAGE' warning/>
                </StyledRow>
            
            </StyledWrapper>
        </MainTemplate>
    )
}
