import React from 'react'
import styled from 'styled-components'
import newtorkicon from '../assets/footer/newtorkicon.png'

const Footer = () => {
    return (
        <Wrapper>
            <div className='d-flex pt-4 align-items-center align-self-start justify-content-end me-5 mb-4'>

                <FollowLine>SUIVEZ-NOUS SUR  : </FollowLine>
                <img src={newtorkicon} width='200px' alt='network social'></img>
            </div>
            <hr style={{ "color": "white", "width": "90%", "margin": "auto" }}></hr>

            <MenuItem className='mt-4 pb-4'>
                <ul className='d-flex justify-content-around w-75 m-auto' style={{ "list-style": "none" }}>
                    <li>MENTIONS LEGALES</li>
                    <li>NOS CGU</li>
                    <li>CHARTE DES COOKIES</li>
                    <li>PREFERENCE DES COOKIES</li>
                </ul>
            </MenuItem>

        </Wrapper>
    )
}

const Wrapper = styled.div`
with:100%;
margin-top:2rem;
font-family:"maven_proregular";
background-color:var(--primary-color);
`

const FollowLine = styled.span`
    font-size:1.4rem;
    color:white;
    margin-right:5rem;
`
const MenuItem = styled.div`
color:white;
`



export default Footer