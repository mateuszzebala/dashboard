import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import styled from 'styled-components'
import { ENDPOINTS } from '../../api/endpoints'
import { FETCH } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import { links } from '../../router/links'
import { APPS } from '../../apps/apps'
import {
    BsFillEyeFill,
    BsFillKeyFill,
    BsPersonFillGear,
    BsTable,
} from 'react-icons/bs'
import { FaUser, FaUsers } from 'react-icons/fa'
import { BiWrench } from 'react-icons/bi'

const IconByModel = {
    user: <FaUser />,
    group: <FaUsers />,
    session: <BsFillKeyFill />,
    log: <BsFillEyeFill />,
    permission: <BsPersonFillGear />,
    configuration: <BiWrench />,
}

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
    padding: 25px 40px;
    background-color: ${({ theme }) => theme.secondary};
    box-shadow: 0 0 5px -3px ${({ theme }) => theme.primary};
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    border-left: 3px solid ${({ theme }) => theme.primary};
    width: 100%;
    max-width: 300px;
    display: flex;
    gap: 10px;
    align-items: center;
    transition: transform 0.2s, background-color 0.2s, color 0.2s;
    &:hover {
        transform: scale(0.95);
    }
`

const StyledAppName = styled.span`
    font-size: 20px;
`

const StyledApp = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    h1 {
        font-size: 20px;
    }
`

export const DatabasePage = () => {
    const [models, setModels] = React.useState([])
    const navigate = useNavigate()
    React.useEffect(() => {
        FETCH(ENDPOINTS.database.models()).then((data) => {
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
        <MainTemplate app={APPS.database} title={'MODELS'}>
            {Object.keys(models).map((app) => (
                <StyledApp key={app}>
                    <StyledAppName>{app.toUpperCase()}</StyledAppName>
                    <StyledModels>
                        {models[app].map((model) => (
                            <StyledModel
                                key={model}
                                onClick={() =>
                                    navigate(links.database.model(model))
                                }
                            >
                                {IconByModel[model.toLowerCase()] ? (
                                    IconByModel[model.toLowerCase()]
                                ) : (
                                    <BsTable />
                                )}
                                {model}
                            </StyledModel>
                        ))}
                    </StyledModels>
                </StyledApp>
            ))}
        </MainTemplate>
    )
}
