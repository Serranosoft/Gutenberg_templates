import React, { useContext, useState, useEffect } from "react";
import styled from '@emotion/styled'
import { DBContext } from "../components/Firebase/UserDAO";
import { AuthContext } from '../components/Firebase/AuthDAO';
import Link from "next/link"
import { useRouter } from "next/router";
import Head from 'next/head'

function Account() {

    const { userName } = useContext(DBContext);
    const { authUser } = useContext(AuthContext);
    const router = useRouter();

    const initialState = {
        oldPassword: "",
        newPassword: ""
    }

    const [inputValues, setInputValues] = useState(initialState);
    const { UpdatePassword, signOut } = useContext(AuthContext);
    const { oldPassword, newPassword } = inputValues;

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValues({ ...inputValues, [name]: value })
    }

    const onSubmit = event => {
        if (oldPassword !== newPassword) {
            UpdatePassword(oldPassword, newPassword)
                .then(authUser => {
                    router.push("/");
                    signOut();
                })
                .catch(error => {
                    console.log(error);
                    document.getElementById("error-msg").innerHTML = error
                });
        } else {
            document.getElementById("error-msg").innerHTML = "Las contraseñas no coinciden"
        }
        event.preventDefault();
    }

    useEffect(() => {
        if (authUser === null) {
            router.push("/registro");
        }
    }, [authUser])

    return (
        <>
            <Head>
                <title>Cuenta - Bloques Gutenberg</title>
                <meta name="description" content="Accede a tu cuenta, encuentra tus bloques gutenberg favoritos y consigue acceso a plantillas premium gratis" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LandingTitle>Bienvenido/a  <span style={{
                color: "#34d399",
                textAlign: "center"
            }}> {userName}</span></LandingTitle>

            <LandingSubtitle>Tu panel personal</LandingSubtitle>
            <AccountWrapper>
                <div style={{ gridArea: "favorites" }}>
                    <BoxTitle>Mis favoritos</BoxTitle>
                    <LandingSubtitle>Accede a tus bloques guardados</LandingSubtitle>
                    <Link href="/cuenta/favoritos" passHref>
                        <LinkWrapper>
                            <Button>Favoritos</Button>
                        </LinkWrapper>
                    </Link>
                </div>
                <form style={{ gridArea: "changepassword" }}>
                    <BoxTitle>Cambiar contraseña</BoxTitle>
                    <Label>Contraseña actual
                        <Input
                            type="password"
                            name="oldPassword"
                            value={oldPassword}
                            onChange={handleChange} />
                    </Label>
                    <Label>Contraseña nueva
                        <Input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={handleChange}
                        />
                    </Label>
                    <ErrorMessage id="error-msg"></ErrorMessage>
                    <Button onClick={onSubmit}>Cambiar contraseña</Button>
                </form>
                <div style={{ gridArea: "stats" }}>
                    <BoxTitle>Puntuación de los bloques</BoxTitle>
                    <LandingSubtitle>Descúbre cuáles son los bloques mas usados</LandingSubtitle>
                    <Link href="/estadisticas" passHref>
                        <LinkWrapper>
                            <Button>Estadísticas</Button>
                        </LinkWrapper>
                    </Link>
                </div>
                <div style={{ gridArea: "temp2" }}>
                    <BoxTitle>Pídeme un bloque y yo te lo creo gratis 👍</BoxTitle>
                    <LandingSubtitle>Envíame gratis un mensaje por Twitter con una descripción del bloque o una imágen de referencia</LandingSubtitle>
                    <LinkWrapper href="https://twitter.com/ImScholz">
                        <Button>Ir a Twitter</Button>
                    </LinkWrapper>
                </div>
            </AccountWrapper>
        </>
    )

}

export default Account

const LandingTitle = styled.h1`
    margin-top: 24px;
    font-size: 50px;
    font-family: 'Texturina', serif;
    color: white;
    word-spacing: -2px;
    text-align: center;
    @media(max-width: 768px) {
        padding: 36px 8px 8px 8px;
        font-size: 33px;
        line-height: 1.3;
        word-spacing: 1px;
    }
`

const LandingSubtitle = styled.p`
    width: 50%;
    margin: 0 auto;
    text-align: center;
    font-size: 17px;
    @media(max-width: 768px) {
        padding: 8px;
        font-size: 14px;
        width: 100%;
    }
`

const AccountWrapper = styled.div`
    width: 70%;
    display: grid;
    grid-template-areas:
    "favorites favorites changepassword changepassword"
    "stats stats temp2 temp2";
    gap: 40px;
    margin: 48px auto;
    & > div, & > form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        background-color: #171e29;
        min-height: 250px;
    }
    & > div:nth-child(2) label:first-of-type {
        margin-top: 20px;
    }

    @media(max-width: 768px) {
        width: 95%;
        grid-template-columns: 1fr !important;
        grid-template-areas:
        "favorites"
        "changepassword"
        "stats"
        "temp2"
        "temp2";
        gap: 30px;
        margin: 32px auto;
    }
`

const BoxTitle = styled.p`
    margin: 10px 0;
    font-size: 25px;
    color: white;
    text-align: center;
    font-weight: bold;
`

const LinkWrapper = styled.a`
    width: 100%;
    margin: 16px auto;
    text-align: center;
    `

const Button = styled.button`
    width: 50%;
    padding: 10px 24px;
    margin: 16px auto;
    background: #1f6952;
    font-size: 17px;
    text-align: center;
    color: white;
    cursor: pointer;
    transition: 0.5s;
    border: 0;
    border-radius: 3px;
    &:hover {
        transform: scale(0.95);
    }
`

const Label = styled.label`
    width: 50%;
    display: block;
    color: white;
    font-size: 13px;
    margin: 8px 0;
    text-align: left;
`

const Input = styled.input`
    width: 100%;
    display: block;
    padding: 8px 24px;
    color: white;
    background-color: #171e29;
    border: 3px solid #373c40;
    outline: 0;
    font-size: 14px;
    &:focus {
        border: 2px solid white;
    }
`

const ErrorMessage = styled.p`
    font-size: 13px;
    color: red;
`