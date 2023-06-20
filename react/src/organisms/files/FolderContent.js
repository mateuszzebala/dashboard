import React from 'react'
import { ItemTile } from './ItemTile'
import styled from 'styled-components'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'


const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 100px);
    gap: 10px;
`

export const FolderContent = ({path, setPath}) => {
    const [files, setFiles] = React.useState([])
    const [folders, setFolders] = React.useState([])

    const setLocation = (next) => {
        setPath(path + '/' + next)
    }

    React.useEffect(()=>{
        FETCH(ENDPOINTS.files.content(), {
            path,
        }).then(data => {
            console.log(data.data)
            setFiles(data.data.files)
            setFolders(data.data.folders)
        })
    }, [path])

    return (
        <StyledWrapper>
            {folders.map(folder => <ItemTile setLocation={setLocation} key={folder} filename={folder} isFile={false} />)}
            {files.map(file => <ItemTile setLocation={setLocation} key={file} filename={file} isFile={true} />)}
        </StyledWrapper>
    )
}
