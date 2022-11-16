import React, {useEffect, useState} from 'react';
import Button from '../../components/UI/buttons/button/Button';
import styles from "./HomePage.module.scss"
import {Link} from "react-router-dom";
import Chat from "../../components/chat/Chat";
import Section from "../../components/UI/section/Section";

const HomePage = () => {


    return (<div>
            <div className={styles.body}>
                <div className={styles.body__top}>
                    <img className={styles.image} src="/images/order.png" alt="Тортик"/>
                    <div className={styles.body__content}>
                        <h1 className={styles.title}>Добро пожаловать в магазин вкуснейших тортов!</h1>
                        <p className={styles.text}> Здесь можно найти торт на любой вкус или же собрать свой. Я учту любое
                            пожелание и предложу вариант, идеально подходящий вам. </p>

                    </div>
                </div>

                <div className={styles.button_group}>
                    <Link to={"/cakes"}>
                        <Button className={styles.button}> Выбрать торт </Button>
                    </Link>
                    <Link to={"/constructor/1"}>
                        <Button className={styles.button}> Собрать свой </Button>
                    </Link>
                    <Link to={"/candies"}>
                        <Button className={styles.button}> Другие сладости </Button>
                    </Link>
                </div>
            </div>
            <Section>
                <h2 className={"section-title"}>Отзывы о нас</h2>
                <Chat></Chat>
            </Section>
    </div>

    );
};

export default HomePage;