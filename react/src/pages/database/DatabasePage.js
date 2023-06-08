import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import styled from 'styled-components'
import { Typography } from '../../atoms/Typography'
import { endpoints } from '../../api/endpoints'
import { FETCH } from '../../api/api'
import { Link } from 'react-router-dom'
import { links } from '../../router/links'
import { APPS } from '../../apps/apps'

const StyledModels = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    a {
        color: ${({ theme }) => theme.primary};
        text-decoration: none;
    }
`
const StyledModel = styled.div`
    padding: 20px 40px;
    background-color: ${({ theme }) => theme.light};
    box-shadow: 0 0 5px -3px black;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    border-left: 2px solid ${({ theme }) => theme.primary};

    transition: transform 0.1s, background-color 0.1s, color 0.1s;
    &:hover {
        transform: scale(1.1);
        background-color: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.light};
    }
`

const StyledApp = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    h1 {
        font-size: 20px;
    }
`

export const DatabasePage = () => {
    const [models, setModels] = React.useState([])

    React.useEffect(() => {
        FETCH(endpoints.database.models()).then((data) => {
            const newModels = {}
            Object.keys(data.data.models).forEach((modelName) => {
                if (!newModels[data.data.models[modelName]])
                    newModels[data.data.models[modelName]] = []
                newModels[data.data.models[modelName]].push(modelName)
            })
            setModels(newModels)
        })
    }, [])

    return (
        <MainTemplate app={APPS.database}>
            {Object.keys(models).map((app) => (
                <StyledApp key={app}>
                    <Typography variant="h1">{app.toUpperCase()}</Typography>
                    <StyledModels>
                        {models[app].map((model) => (
                            <Link to={links.database.model(model)} key={model}>
                                <StyledModel>{model}</StyledModel>
                            </Link>
                        ))}
                    </StyledModels>
                </StyledApp>
            ))}
        </MainTemplate>
    )
}
