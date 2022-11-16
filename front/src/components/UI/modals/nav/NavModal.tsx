import React, {useEffect, useState} from 'react';
import Modal from "../Modal";
import {useActions} from "../../../../hooks/actions";
import {Link, useNavigate} from "react-router-dom";
import Button from "../../buttons/button/Button";
import {useAppSelector} from "../../../../hooks/redux";
import styles from "./NavModal.module.scss";

interface Props {
    isModalOpen: boolean,
    setIsModalOpen: (arg: boolean) => void,
}
interface Link {
    to: string;
    text: string;
}

const NavModal = ({isModalOpen, setIsModalOpen} : Props) => {


    const {user} = useAppSelector(state => state.user)

    const links: Link[] = [


        {
            to: "/cakes", text: 'Торты'
        },
        {
            to: "/candies", text: 'Сладости'
        },
        {
            to: "/constructor/1", text: 'Конструктор'
        },
        {
            to: user.id ? '/profile' : "/auth", text: 'Профиль'
        },
        {
            to: "/cart", text: 'Корзина'
        },
        {
            to: '',
            text: 'Отмена',
        }
    ]


    const [items, setItems] = useState([]) as [Link[], Function]
    useEffect(() => {
        items.length !== links.length && setTimeout(() => {
            setItems([...items, links[items.length]])
        }, items.length ? 400 : 1400)

    }, [items])

    useEffect(() => {
        if (!isModalOpen) {
            setItems([])
        }
    }, [isModalOpen])

    return (
        <Modal isModalOpen={isModalOpen}
               setIsModalOpen={(boolean: boolean) => setIsModalOpen(boolean)}>
                <ul className={[styles.list].join(' ')}>
                    {items.map(item => <li className={styles.item} key={item.to}>
                        <Link to={item.to}>
                            <Button className={[styles.button,item.to === '' ? styles.cancel : ''].join(' ')} onClick={() => setIsModalOpen(false)}>
                                {item.text}
                            </Button>
                        </Link>
                    </li>)}
                </ul>
        </Modal>
    );
};

export default NavModal;