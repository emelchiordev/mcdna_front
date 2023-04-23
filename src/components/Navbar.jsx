import React from 'react'
import logo from "../assets/navbar/logo.png"
import menuhamburger from "../assets/navbar/menuhamburger.png"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logout } from '../services/checkJwtCookies';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ authenticated, setAuthenticated }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate("../", { replace: true });

    }

    return (
        <nav className="navbar navbar-expand-lg navbar-extend-style">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src={logo} width="35px" height="35px" alt='logo' />
                    <span style={{ "marginLeft": "5px" }}>MERCADONA</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" href="#">
                            <img src={menuhamburger} alt='menu hamburger' width="20px" />
                            <span style={{ "marginLeft": "5px" }}>Rayons</span>

                        </a>
                        <a className="nav-link" href="#">Promotions</a>
                        <Link to="/catalogue" className="nav-link" href="#">Catalogue</Link>
                    </div>

                </div>
                {authenticated ?
                    (<div className="d-flex me-2" onClick={handleLogout}>
                        <PrivateButton authenticated>Deconnexion</PrivateButton>
                    </div>) :
                    (<Link style={{ textDecoration: 'none' }} to="/espace-prive">
                        <div className="d-flex me-2">
                            <PrivateButton>Espace privé</PrivateButton>
                        </div>
                    </Link>)
                }

            </div>
        </nav>
    )
}

const PrivateButton = styled.div`
color:#FFF;
font-family:"maven_proregular";
cursor:pointer;
padding-left:1rem;
padding-right:1rem;
padding-top:4px;
padding-bottom:4px;
border-radius:20px;
background-color:${props => props.authenticated ? 'var(--primary-color);' : "var(--secondary-color);"}
&:hover{
    background-color:${props => props.authenticated ? 'var(--secondary-color);' : "var(--primary-color);"}

}
`


export default Navbar