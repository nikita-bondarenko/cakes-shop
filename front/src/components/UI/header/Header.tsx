import React, {useState} from 'react';
import styles from './Header.module.scss'
import Container from "../container/Container";
import {useNavigate} from "react-router-dom";
import Logo from "../logo/Logo";
import Button from "../buttons/button/Button";
import NavModal from "../modals/nav/NavModal";


const Header = () => {

    const [isNavModalOpen, setIsNavModalOpen] = useState(false)

    const navigate = useNavigate()

    const onLogoClick = () => {
        window.location.pathname == '/' ? setIsNavModalOpen(true) : navigate('/')
    }

    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.body}>
                    <Button className={styles.logo} onClick={onLogoClick}>
                        <Logo></Logo>
                    </Button>

                    <Button onClick={() => setIsNavModalOpen(true)}>
                        <img className={styles.menu} src="/images/menu-icon.svg" alt="Меню"/>
                    </Button>
                </div>
            </Container>
            <NavModal isModalOpen={isNavModalOpen} setIsModalOpen={value => setIsNavModalOpen(value)}></NavModal>
        </div>
    );
};

export default Header;