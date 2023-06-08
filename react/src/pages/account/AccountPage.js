import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { links } from '../../router/links'

export const AccountPage = () => {
    return (
        <MainTemplate
            app={{
                name: 'Account',
                icon: MdOutlineAccountCircle,
                link: links.account.index(),
            }}
        ></MainTemplate>
    )
}
