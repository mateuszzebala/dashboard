import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { FolderContent } from '../../organisms/files/FolderContent'
import { Button } from '../../atoms/Button'
import { BsFilePlus, BsFolderPlus } from 'react-icons/bs'
import { Input } from '../../atoms/Input'
import styled from 'styled-components'
import { FaCheck, FaSearch } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { BiCopy, BiCut, BiPaste, BiRename } from 'react-icons/bi'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'

const StyledMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 10px;
`

const StyledMenuSide = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

export const FilesPage = () => {
    const [path, setPath] = React.useState()
    const [initData, setInitData] = React.useState({})

    React.useEffect(() => {
        FETCH(ENDPOINTS.files.init()).then((data) => {
            setInitData(data.data)
            setPath(data.data.home)
        })
    }, [])

    const [searchValue, setSearchValue] = React.useState('')
    return (
        <MainTemplate
            app={APPS.files}
            title={path}
            submenuChildren={
                <StyledMenu>
                    <StyledMenuSide>
                        <Button tooltip={'SELECT ALL'} icon={<FaCheck />} />
                        <Button tooltip={'NEW FILE'} icon={<BsFilePlus />} />
                        <Button
                            tooltip={'NEW FOLDER'}
                            icon={<BsFolderPlus />}
                        />
                        <Button tooltip={'DELETE'} icon={<FiTrash />} />
                        <Button tooltip={'REMOVE'} icon={<BiRename />} />
                        <Button tooltip={'COPY'} icon={<BiCopy />} />
                        <Button tooltip={'CUT'} icon={<BiCut />} />
                        <Button tooltip={'PASTE'} icon={<BiPaste />} />
                    </StyledMenuSide>
                    <StyledMenuSide>
                        <Input
                            value={searchValue}
                            setValue={setSearchValue}
                            icon={<FaSearch />}
                            label={'SEARCH'}
                        />
                    </StyledMenuSide>
                </StyledMenu>
            }
        >
            {initData && path && (
                <FolderContent path={path} setPath={setPath} />
            )}
        </MainTemplate>
    )
}
