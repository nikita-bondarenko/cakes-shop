import React, {useEffect, useState} from 'react';
import './styles/App.scss';
import Router from "./components/Router";
import Header from "./components/UI/header/Header";
import {useActions} from "./hooks/actions";
import {useAppSelector} from "./hooks/redux";
import {arrTypes} from "./types";
import {colors} from "./store/ui/ui.slice";
import {decodeToken} from "react-jwt";
import {BASE_URL_API, JWT_KEY} from "./config";
import {useLazyGetOneQuery} from "./store/user/user.api";
import io, {Socket} from "socket.io-client"
import {useLocation} from "react-router-dom";
import {AnimatedCursor} from "./components/Cursor";


function App() {
    const {setUi} = useActions()
    const {isModalOpen, isMobile} = useAppSelector(state => state.ui)
    const {setUserState, setIsAdmin} = useActions()
    const [getUser] = useLazyGetOneQuery()
    const {user} = useAppSelector(state => state.user)
    const location = useLocation()
    const {isAdmin} = useAppSelector(state => state.auth)

    useEffect(() => {
            if (user.id && user.roles.some((item: { value: string }) => item.value === "ADMIN")) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }

    }, [user])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        if (isModalOpen) {
            setUi({type: arrTypes.MAIN_COLOR, value: colors.blue})
            setUi({type: arrTypes.CURSOR_COLOR, value: colors.blue})
        } else {
            setUi({type: arrTypes.MAIN_COLOR, value: colors.pink})
            setUi({type: arrTypes.CURSOR_COLOR, value: colors.red})
        }
    }, [isModalOpen])

    useEffect(() => {setUi({type: "isMobile", value: document.body.clientWidth < 960})}, [document.body.clientWidth])

    useEffect(() => {

        const token = localStorage.getItem(JWT_KEY)
        if (token) {
            const decodedToken = decodeToken(token) as { id: number }
            if (decodedToken) {
                getUser(decodedToken.id).then(res => res.data && setUserState(res.data))
            }
        }
    }, [])

    return (
        <>
            <Header/>
            <Router></Router>
            {!isMobile && <AnimatedCursor></AnimatedCursor>}
        </>

    )
}

export default App;
