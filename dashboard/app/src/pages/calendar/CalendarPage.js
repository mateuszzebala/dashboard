import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import styled from 'styled-components'
import { Button } from '../../atoms/Button'
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa'
import { Typography } from '../../atoms/Typography'
import { Select } from '../../atoms/Select'
import { range } from '../../utils/utils'
import { useModalForm } from '../../utils/hooks'
import { Prompt } from '../../atoms/modalforms/Prompt'

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const StyledCalendar = styled.div`
    padding: 10px;
    height: 100%;
`

const StyledTemp = styled.div``

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, calc(100% / 7 - 5px));
    gap: 5px;
    height: 100%;
`

const StyledDay = styled.button`
    border: ${({temp})=>temp ? '0' : '2px'} solid ${({theme, sunday})=>sunday ? theme.error : theme.primary};
    background-color: transparent;
    display: flex;
    padding: 10px;
    visibility: ${({temp})=>temp?'hidden':'visable'};
    cursor: pointer;
    font-size: 24px;
    align-items: flex-start;
    justify-content: flex-end;
    font-weight: 100;
    color: ${({theme, sunday})=>sunday ? theme.error : theme.primary};
    background-color: ${({theme})=>theme.secondary};
    transition: color 0.3s, background-color 0.3s;

    &:hover{
        color: ${({theme})=>theme.secondary};
        background-color: ${({theme, sunday})=> sunday ? theme.error : theme.primary};
    }
    
`



const StyledDayName = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 15px;
    color: ${({theme, sunday})=>sunday ? theme.error : theme.primary};
`

export const CalendarPage = () => {
    const [month, setMonth] = React.useState({month: 0, year: 2023})
    const modalForm = useModalForm()
    return (
        <MainTemplate 
            app={APPS.calendar} 
            title={`${MONTHS[month.month]} ${month.year}`}
            submenuChildren={
                <>
                    <Button onClick={()=>{
                        modalForm({
                            content: Prompt,
                            setButton: 'SELECT',
                            title: 'SELECT YEAR',
                            icon: <APPS.calendar.icon/>,
                            initValue: month.year,
                            type: 'number',
                            todo: (val)=>{
                                setMonth({month: month.month, year: val})
                            }
                        })
                    }} second size={1.2} subContent='YEAR'>{month.year}</Button>
                    <Button onClick={()=>{
                        setMonth(prev => prev.month > 0 ? {month: prev.month - 1, year: prev.year} : prev)
                    }} second size={1.3} icon={<FaArrowLeft/>} subContent='PREVIOUS'/>
                    <Typography variant={'h3'}>{MONTHS[month.month]}</Typography>
                    <Button onClick={()=>{
                        setMonth(prev => prev.month < 11 ? {month: prev.month + 1, year: prev.year} : prev)
                    }} second size={1.3} icon={<FaArrowRight/>} subContent='NEXT'/>
                    <Button second size={1.3} icon={<FaPlus/>} subContent='EVENT'/>
                </>
            }
        >
            <StyledCalendar>
                <StyledGrid>
                    <StyledDayName>Monday</StyledDayName>
                    <StyledDayName>Tuesday</StyledDayName>
                    <StyledDayName>Wendesday</StyledDayName>
                    <StyledDayName>Thursday</StyledDayName>
                    <StyledDayName>Friday</StyledDayName>
                    <StyledDayName>Saturday</StyledDayName>
                    <StyledDayName sunday>Sunday</StyledDayName>
                    <StyledDay temp></StyledDay>
                    <StyledDay temp></StyledDay>
                    <StyledDay temp></StyledDay>
                    <StyledDay temp></StyledDay>
                    <StyledDay>1</StyledDay>
                    <StyledDay>2</StyledDay>
                    <StyledDay sunday>3</StyledDay>
                    <StyledDay>4</StyledDay>
                    <StyledDay>5</StyledDay>
                    <StyledDay>6</StyledDay>
                    <StyledDay>7</StyledDay>
                    <StyledDay>8</StyledDay>
                    <StyledDay>9</StyledDay>
                    <StyledDay sunday>10</StyledDay>
                    <StyledDay>11</StyledDay>
                    <StyledDay>12</StyledDay>
                    <StyledDay>13</StyledDay>
                    <StyledDay>14</StyledDay>
                    <StyledDay>15</StyledDay>
                    <StyledDay>16</StyledDay>
                    <StyledDay sunday>17</StyledDay>
                    <StyledDay>18</StyledDay>
                    <StyledDay>19</StyledDay>
                    <StyledDay>20</StyledDay>
                    <StyledDay>21</StyledDay>
                    <StyledDay>22</StyledDay>
                    <StyledDay>23</StyledDay>
                    <StyledDay sunday>24</StyledDay>
                    <StyledDay>25</StyledDay>
                    <StyledDay>26</StyledDay>
                    <StyledDay>27</StyledDay>
                    <StyledDay>28</StyledDay>
                    <StyledDay>29</StyledDay>
                    <StyledDay>30</StyledDay>
                </StyledGrid>
            </StyledCalendar>
        </MainTemplate>
    )
}