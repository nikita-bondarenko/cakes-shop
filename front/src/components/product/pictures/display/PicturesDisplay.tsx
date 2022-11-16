import React, {useEffect, useState} from 'react';
import {Picture} from "../../../../types";
import {BASE_URL_API} from "../../../../config";
import Button from "../../../UI/buttons/button/Button";
import styles from './PicturesDisplay.module.scss'
import {useAppSelector} from "../../../../hooks/redux";


const PicturesDisplay = () => {

    const [showingPicture, setShowingPicture] = useState() as [Picture, Function]
    const {pictures: items} = useAppSelector(state => state.product)
    const {isMobile} = useAppSelector(state => state.ui)
    useEffect(() => {
        items.length && setShowingPicture(items.find(item => item.main) || items[0])
    }, [items])

    return (
        <div className={styles.body}>
            <div className={styles.display}>
                <ul className={styles.display__wrapper} style={{left: -(items.indexOf(showingPicture) * (isMobile ? (document.body.clientWidth - 30) : 500))}}>
                    {items.map(item => <li className={styles.display__item} key={item.id}>
                        <img className={styles.display__image} src={BASE_URL_API + '/' + item.value}
                             alt="Изображение товара"/>
                    </li>)}
                </ul>
            </div>


            {items.length > 1 && <ul className={styles.buttons}>
                {items.map(item =>
                    <li className={styles.buttons__item} key={item.id}>
                        <Button className={[styles.buttons__button, showingPicture === item && "disabled"].join(' ')}
                                onClick={() => setShowingPicture(item)}>
                            <img className={styles.buttons__image} src={BASE_URL_API + '/' + item.value}
                                 alt="Изображение товара"/>
                        </Button>
                    </li>
                )}
            </ul>}

        </div>
    );
};

export default PicturesDisplay;