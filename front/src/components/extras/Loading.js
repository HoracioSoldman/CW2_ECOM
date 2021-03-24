import React from 'react'
import styled from 'styled-components'
import {MdRefresh} from 'react-icons/md'

const Wrapper = styled.div`
    font-size:${props=>props.size !== undefined ?
        props.size === 'small' ? '1rem' :
        props.size === 'large' ? '2rem' :
        '1.3rem' : '1.3rem'
    }

    @keyframes loading {
        0% {
            transform: rotate(0);
        }
        50% {
            transform: rotate(900deg);
        }
        100% {
            transform: rotate(1800deg);
        }
    }
    .icon {
        color: #0056b3
        animation: loading 1.5s infinite;
    }

`;

export default function Loading({text, size}) {
    return (
        <Wrapper size={size}>
            <MdRefresh className="icon"/>{text && text}
        </Wrapper>
    )
}