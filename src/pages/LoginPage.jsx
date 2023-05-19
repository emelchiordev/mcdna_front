import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import logo from "../assets/navbar/logo.png"
import Loginapi from '../services/Loginapi';
import { checkJwtCookies } from '../services/checkJwtCookies';

const LoginPage = ({ setAuthenticated }) => {

    const navigate = useNavigate();

    const [sending, setSending] = useState(false);

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState(false);

    const handleCredential = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleKeyDown = (e) => {
        if (e.key == "Enter") {
            handleSubmit()
        }
    }

    const handleSubmit = () => {
        setSending(true);
        Loginapi.setLogin(credentials)
            .then((response) => {
                if (response.status === 204 || response.status === 200) {
                    checkJwtCookies()
                    navigate("../", { replace: true });
                }
            })
            .catch((error) => {
                setError(true);
                setSending(false);
            });
    }




    return (
        <div className='container d-flex flex-column justify-content-center align-items-center h-75'>

            <div className="navbar-brand d-flex align-items-center mt-4">
                <span><img src={logo} alt='logo' /></span>
                <span style={{ "marginLeft": "5px" }}>Espace Privé</span>
            </div>

            <Wrapper>

                <div className='text-center'>
                    <form
                        onSubmit={handleSubmit}
                        className="d-flex flex-column   align-items-center"
                    >
                        <div className="form-group">
                            <label htmlFor="username"></label>
                            <input
                                className={"form-control " + (error && "is-invalid")}
                                name="username"
                                type="text"
                                placeholder="Votre adresse email"
                                value={credentials.username}
                                onSelect={() => setError(false)}
                                onChange={handleCredential}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passowrd"></label>
                            <input
                                className={"form-control " + (error && "is-invalid")}
                                name="password"
                                type="password"
                                placeholder="Votre mot de passe"
                                value={credentials.password}
                                onSelect={() => setError(false)}
                                onChange={handleCredential}
                                autoComplete="off"
                                onKeyDown={handleKeyDown}

                            />
                            {error && (
                                <p className="invalid-feedback">
                                    Vos identifiants ne sont pas valides
                                </p>
                            )}
                        </div>

                        <div className="form-group align-self-center">
                            {sending ? (
                                <div
                                    className="spinner-border text-secondary"
                                    role="status"
                                ></div>
                            ) : (
                                <Button onClick={handleSubmit} type="submit">
                                    Connexion
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
  margin-top: 2rem;
  font-family: "maven_proregular";
  background-color: #fff;
  width: 80%;

  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  @media screen and (min-width: 1024px) {
    width: 40%;
  }
  @media screen and (min-width: 1200px) {
    width: 30%;
  }
`;

const Button = styled.div`
width:100%;
margin-top:1rem;
color:white;
padding-left:1rem;
padding-right:1rem;
padding-top:4px;
padding-bottom:4px;
border-radius:20px;
background-color:var(--secondary-color);
&:hover{
    background-color:var(--primary-color);

}
`


export default LoginPage