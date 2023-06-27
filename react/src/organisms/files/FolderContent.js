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

export const FolderContent = ({ path, setPath }) => {
    const [files, setFiles] = React.useState([])
    const [folders, setFolders] = React.useState([])

    React.useEffect(() => {
        setPath((prev) => {
            return prev
                .split('/')
                .filter((name) => name !== '..')
                .join('/')
        })
    }, [path])

    React.useEffect(() => {
        FETCH(ENDPOINTS.files.content(), {
            path,
        }).then((data) => {
            console.log(data.data)
            setFiles(data.data.files)
            setFolders(data.data.folders)
        })
    }, [path])

    return (
        <StyledWrapper>
            <ItemTile
                setLocation={() => {
                    setPath(path + '/' + '..')
                }}
                filename={'UP'}
                isFile={false}
            />
            {folders.map((folder) => (
                <ItemTile
                    setLocation={() => setPath(folder.path)}
                    key={folder.name}
                    filename={folder.name}
                    isFile={false}
                />
            ))}
            {files.map((file) => (
                <ItemTile
                    setLocation={() => setPath(file.path)}
                    key={file.name}
                    filename={file.name}
                    isFile={true}
                />
            ))}
        </StyledWrapper>
    )
}
