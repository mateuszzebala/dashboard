import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { UserTile } from '../../organisms/users/UserTile'
import { Input } from '../../atoms/Input'
import styled from 'styled-components'
import { Paginator } from '../../atoms/Paginator'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { Button } from '../../atoms/Button'
import { FloatingActionButton } from '../../atoms/FloatingActionButton'
import { FaLock, FaLockOpen, FaPlus } from 'react-icons/fa'
import { FiPlay, FiPlus, FiSearch } from 'react-icons/fi'
import { useModalForm } from '../../utils/hooks'
import { Prompt } from '../../atoms/modalforms/Prompt'

const StyledUsersGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    overflow-y: auto;
    justify-content: center;
    align-items: center;
    padding: 10px 5px;
`

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`
const StyledPaginator = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0 0;
`

const StyledNoUsers = styled.span`
    font-size: 30px;
`

export const UsersPage = () => {
    const [search, setSearch] = React.useState('')
    const [users, setUsers] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [admin, setAdmin] = React.useState(false)
    const [pages, setPages] = React.useState(0)
    const modalForm = useModalForm()

    React.useEffect(() => {
        let query = admin ? 'is_superuser=True' : 'is_superuser=False'
        if (search) {
            query += `,username__contains=${search.toLowerCase()}`
        }
        FETCH(
            ENDPOINTS.database.items('User', {
                page,
                length: 30,
                query,
            })
        ).then((data) => {
            setUsers(data.data.items.map((item) => item.fields))
            setPages(data.data.pages)
        })
    }, [search, admin])

    return (
        <MainTemplate
            app={APPS.users}
            submenuChildren={
                <>
                    <Button
                        second={!admin}
                        onClick={() => {
                            setAdmin((prev) => !prev)
                        }}
                        icon={admin ? <FaLock /> : <FaLockOpen />}
                        subContent={admin ? 'ADMINS' : 'NORMAL'}
                        size={1.3}
                    />
                    <Button
                        second
                        onClick={() => {
                            modalForm({
                                content: Prompt,
                                title: 'SEARCH USER',
                                icon: <FiSearch/>,
                                todo: (val) => {
                                    setSearch(val)
                                },
                                initValue: search
                            })
                        }}
                        onKey={{
                            key: 'f',
                            ctrlKey: true,
                            prevent: true
                        }}
                        icon={<FiSearch/>}
                        subContent={'SEARCH'}
                        size={1.3}
                    />
                    <Button second size={1.3} icon={<FiPlus />} subContent='NEW' />
                </>
            }
        >
            <StyledContent>
                <StyledUsersGrid>
                    {users.map((user) => (
                        <UserTile key={user.id} data={user} />
                    ))}
                    {users.length < 1 && (
                        <StyledNoUsers>
                            NO USERS
                            {search ? ` WITH USERNAME LIKE '${search}'` : ''}
                        </StyledNoUsers>
                    )}
                </StyledUsersGrid>

                {pages > 1 && (
                    <StyledPaginator>
                        <Paginator
                            second
                            pages={pages}
                            value={page}
                            setValue={setPage}
                        />
                    </StyledPaginator>
                )}
            </StyledContent>
        </MainTemplate>
    )
}
