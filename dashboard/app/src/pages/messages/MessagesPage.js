import React from 'react'
import { MainTemplate } from '../../templates/MainTemplate'
import { APPS } from '../../apps/apps'
import { Button } from '../../atoms/Button'
import styled from 'styled-components'

const StyledIcon = styled.img`
    width: 20px;
`

const StyledButtons = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
`

export const MessagesPage = () => {
    return (
        <MainTemplate app={APPS.messages}>
            <StyledButtons>
                <Button>
                    <StyledIcon
                        src={
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png'
                        }
                    />
                    GOOGLE
                </Button>
                <Button>
                    <StyledIcon
                        src={
                            'https://cdn-icons-png.flaticon.com/512/5968/5968764.png'
                        }
                    />
                    FACEBOOK
                </Button>
                <Button>
                    <StyledIcon
                        src={
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1724px-Apple_logo_white.svg.png'
                        }
                    />
                    APPLE
                </Button>
            </StyledButtons>
        </MainTemplate>
    )
}
