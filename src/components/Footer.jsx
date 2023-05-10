import React from 'react'
import styled from 'styled-components'
import newtorkicon from '../assets/footer/newtorkicon.png'


const Footer = () => {
    return (
        <Wrapper>
            <div className='container'>
                <div className='d-flex pt-4 align-items-center align-self-start justify-content-end me-5 mb-4 w-100 flex-wrap'>

                    <FollowLine>SUIVEZ-NOUS SUR  : </FollowLine>
                    <img src={newtorkicon} width='200px' alt='network social'></img>
                </div>
                <hr style={{ "color": "white", "width": "90%", "margin": "auto" }}></hr>

                <MenuItem className='mt-4 pb-4'>
                    <ul className='d-flex justify-content-center flex-wrap p-1' style={{ "listStyle": "none", "padding": "0" }}>
                        <li style={{ "flex-basis": "100%" }}>MENTIONS LEGALES</li>
                        <li style={{ "flex-basis": "100%" }}>NOS CGU</li>
                        <li style={{ "flex-basis": "100%" }}>CHARTE DES COOKIES</li>
                        <li style={{ "flex-basis": "100%" }}>PREFERENCE DES COOKIES</li>
                    </ul>
                </MenuItem>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
postion:absolute;
bottom:0;
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