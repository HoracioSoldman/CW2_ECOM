import styled from 'styled-components'

export const Wrapper = styled.div`
    .product-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
        grid-gap: 1rem;
        .photo-preview {
            text-align: center;
        }
        .product-details {
            padding: 1rem;
        }
        img {
            max-width: 100%;
            max-height: 440px;
            margin: 1rem .5rem;
            box-shadow: 1px 2px 3px rgba(0,0,0,.5);
            cursor: pointer;
        }
        h2 {
            font-weight: 400;
            
        }
    }

    .input-row {
        display: grid;
        margin: 1rem .5rem;
        select, input {
            padding: .5rem;
            background-color: #fff;
            margin: .5rem 0;
        }
    }

    .btn-control {
        padding: 1rem 0;
        display: flex;
        flex-wrap: wrap;
    }

    .btn-submit {
        color: #fff;
    }

    .btn-admin {
        padding: 1rem 1.5rem;
    }
    .product-details p {
        line-height: 3rem;
    }
`