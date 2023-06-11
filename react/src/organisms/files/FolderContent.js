import React from 'react'
import { ItemTile } from './ItemTile'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 100px);
    gap: 10px;
`

export const FolderContent = () => {
    return (
        <StyledWrapper>
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />{' '}
            <ItemTile filename={'main.py'} isFile={true} />
            <ItemTile filename={'src'} isFile={false} />
        </StyledWrapper>
    )
}
