import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { FolderContent } from '../../organisms/files/FolderContent'
import { Typography } from '../../atoms/Typography'
import styled from 'styled-components'

const StyledPath = styled.div`
    padding: 10px 0;
`

export const FilesPage = () => {
    const [path, setPath] = React.useState('/home/mz')
    return (
        <MainTemplate app={APPS.files}>
            <StyledPath>
                <Typography variant={'h2'}>{path}</Typography>
            </StyledPath>
            <FolderContent path={path} setPath={setPath}/>
        </MainTemplate>
    )
}
