import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { UserTile } from '../../organisms/users/UserTile'
import styled from 'styled-components'
import { Paginator } from '../../atoms/Paginator'
import { FETCH } from '../../api/api'
import { ENDPOINTS } from '../../api/endpoints'
import { Button } from '../../atoms/Button'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import { FiPlus, FiSearch, FiUserPlus } from 'react-icons/fi'
import { useModalForm } from '../../utils/hooks'
import { Prompt } from '../../atoms/modalforms/Prompt'
import { LINKS } from '../../router/links'
import { useSearchParams } from 'react-router-dom'

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
    font-size: 20px;
`

export const UsersPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const [search, setSearch] = React.useState('')
    const [users, setUsers] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [admins, setAdmins] = React.useState(searchParams.get('admins') === 'true' || false)
    const [pages, setPages] = React.useState(0)
    const modalForm = useModalForm()

    React.useEffect(()=>{
        setSearchParams(prev => ({...prev, admins}))
    }, [admins])


    React.useEffect(() => {
        let query = admins ? 'is_superuser=True' : 'is_superuser=False'
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
    }, [search, admins])

    return (
        <MainTemplate
            app={APPS.users}
            submenuChildren={
                <>
                    <Button
                        second={!admins}
                        onClick={() => {
                            setAdmins((prev) => !prev)
                        }}
                        icon={admins ? <FaLock /> : <FaLockOpen />}
                        subContent={admins ? 'ADMINS' : 'NORMAL'}
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
                    <Button to={LINKS.users.new()} second size={1.3} icon={<FiUserPlus />} subContent='NEW' />
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
                            THERE IS NO USERS
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
