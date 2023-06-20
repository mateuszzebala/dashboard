import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { FolderContent } from '../../organisms/files/FolderContent'
import {Button} from '../../atoms/Button'
import styled from 'styled-components'

const StyledPath = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    a{
        text-decoration: none;
    }
`

export const FilesPage = () => {
    const [path, setPath] = React.useState('/home/mz')
    return (
        <MainTemplate app={APPS.files}>
            <StyledPath>
                <Button onClick={()=>{setPath('/')}}>/</Button>
                {Object.keys(path.split('/').filter(item => item !== '')).map(key => <Button onClick={()=>{
                    setPath('/' + path.split('/').filter(item => item !== '').slice(0, key+1).join('/'))
                }} key={key}>{path.split('/').filter(item => item !== '')[key]}</Button>)}
            </StyledPath>
            <FolderContent path={path} setPath={setPath}/>
        </MainTemplate>
    )
}
