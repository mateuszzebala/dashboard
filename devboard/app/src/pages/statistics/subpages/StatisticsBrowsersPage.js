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

const StyledBrowser = styled.div`
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


const browserData = [
    {
        name: 'Chrome',
        icon: <Icon icon={'logos:chrome'} />,
        percent: 51,
    },
    {
        name: 'Edge',
        icon: <Icon icon={'logos:microsoft-edge'} />,
        percent: 25,
    },
    {
        name: 'Opera',
        icon: <Icon icon={'logos:opera'} />,
        percent: 12,
    },
    {
        name: 'Firefox',
        icon: <Icon icon={'logos:firefox'} />,
        percent: 4,
    },
    {
        name: 'Brave',
        icon: <Icon icon={'logos:brave'} />,
        percent: 2,
    },
    {
        name: 'Safari',
        icon: <Icon icon={'logos:safari'} />,
        percent: 2,
    },
    {
        name: 'Tor',
        icon: <Icon icon={'logos:tor-browser'} />,
        percent: 1,
    },
    {
        name: 'Vivaldi',
        icon: <Icon icon={'logos:vivaldi-icon'} />,
        percent: 1,
    },
    {
        name: 'Internet Explorer',
        icon: <Icon icon={'logos:internetexplorer'} />,
        percent: 1,
    },
    {
        name: 'Arc',
        icon: <Icon icon={'logos:arc'} />,
        percent: 1,
    },
    {
        name: 'Other',
        icon: <Icon icon={'icon-park:browser'} />,
        percent: 1,
    },


]

export const StatisticsBrowsersPage = () => {
    return (
        <MainTemplate app={APPS.statistics} title={'BROWSERS'}>
            <StyledWrapper>
                {browserData.map(browser => (
                    <StyledBrowser key={browser.name}>
                        <span>{browser.icon} <StyledPercentBar value={browser.percent} /> {browser.percent}%</span>
                        <span>{browser.name}</span>
                    </StyledBrowser>
                ))}

            </StyledWrapper>
        </MainTemplate>
    )
}