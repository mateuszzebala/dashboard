import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { FaSearch } from 'react-icons/fa'
import { LINKS } from '../../router/links'

export const SearchPage = () => {
    return (
        <MainTemplate
            app={{
                name: 'Search',
                icon: FaSearch,
                link: LINKS.search.index(),
            }}
        ></MainTemplate>
    )
}
