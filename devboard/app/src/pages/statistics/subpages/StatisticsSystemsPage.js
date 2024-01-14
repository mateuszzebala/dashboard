import React from 'react'
import { MainTemplate } from '../../../templates/MainTemplate'
import { APPS } from '../../../apps/apps'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: flex-start;
	gap: 5px;
	padding: 20px;
`

const StyledSystem = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	cursor: pointer;
	background-color: ${({ theme }) => theme.quaternary}44;
	border-radius: 7px;
	font-size: 17px;
	align-items: center;
	span:first-child{
		display: inline-flex;
		gap: 10px;
		width: 80%;
		align-items: center;
		svg{
			font-size: 30px;
		}
	}
	span:last-child{
		width: 20%;
		text-align: right;
		text-overflow: ellipsis;
		overflow: hidden;
		font-weight: normal;
	}
`

const StyledPercentBar = styled.div`
	@keyframes animate{
		from{
			transform: scaleX(0%);
		}
		to{
			transform: scaleX(100%);
		}
	}
	transform-origin: left center;
	height: 4px;
	border-radius: 5px;
	width: ${({ value }) => value}%;
	animation: animate 1s ease forwards;
	background-color: ${({ theme }) => theme.primary};
`


const systemData = [
    {
        name: 'Windows',
        icon: <Icon icon={'devicon:windows11'} />,
        percent: 40,
    },
    {
        name: 'Mac OS',
        icon: <Icon icon={'wpf:macos'} />,
        percent: 30,
    },
    {
        name: 'Android',
        icon: <Icon icon={'devicon:android'} />,
        percent: 20,
    },
    {
        name: 'iOS',
        icon: <Icon icon={'wpf:macos'} />,
        percent: 16,
    },
    {
        name: 'Debian',
        icon: <Icon icon={'logos:debian'} />,
        percent: 14,
    },
    {
        name: 'Ubuntu',
        icon: <Icon icon={'logos:ubuntu'} />,
        percent: 10,
    },
    {
        name: 'Arch',
        icon: <Icon icon={'logos:archlinux'} />,
        percent: 8,
    },
    {
        name: 'Manjaro',
        icon: <Icon icon={'logos:manjaro'} />,
        percent: 6,
    },
    {
        name: 'Fedora',
        icon: <Icon icon={'logos:fedora'} />,
        percent: 4,
    },
    {
        name: 'Other',
        icon: <Icon icon={'emojione-v1:laptop-computer'} />,
        percent: 2,
    },

]

export const StatisticsSystemPage = () => {
    return (
        <MainTemplate app={APPS.statistics} title={'SYSTEMS'}>
            <StyledWrapper>
                {systemData.map(browser => (
                    <StyledSystem key={browser.name}>
                        <span>{browser.icon} <StyledPercentBar value={browser.percent} /> {browser.percent}%</span>
                        <span>{browser.name}</span>
                    </StyledSystem>
                ))}

            </StyledWrapper>
        </MainTemplate>
    )
}