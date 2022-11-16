import React, {ComponentElement, createRef, ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import styles from "./Modal.module.scss";
import {useActions} from "../../../hooks/actions";
import {useAppSelector} from "../../../hooks/redux";
import {arrTypes} from "../../../types";

interface Props {

    children: ReactNode | ComponentElement<any, any>,
    setIsModalOpen: (arg: boolean) => void;
    isModalOpen: boolean;
}

// @ts-ignore
const Modal = ({ children,  setIsModalOpen, isModalOpen}: Props) => {

    const animationDuration = 1000
    const shadow = createRef<HTMLButtonElement>()
    const land = createRef<HTMLDivElement>()
    const [isModalContent, setIsModalContent] = useState(false)

    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => setIsModalContent(true), 800)
        } else setIsModalContent(false)

    }, [isModalOpen])

    const{setUi} = useActions()

    useEffect(()  => {
        setUi({type: "isModalOpen", value: isModalOpen})
        return () => {
            setUi({type: "isModalOpen", value: false})
        }
    }, [isModalOpen])

    return (
        <div onClick={() => setIsModalOpen(false)} className={styles.modal} style={{display: isModalOpen ? 'block' : 'none'}}>
            <button ref={shadow} className={isModalOpen ? styles.shadow : styles.shadow__closing}
                    style={{top: '50%', right: '50%', animationDuration: `${animationDuration}ms`}}>
            </button>
            <div onClick={e => e.stopPropagation()} ref={land} className={isModalOpen ? styles.land : styles.land__closing}
                 style={{top: '50%', right: '50%', animationDuration: `${animationDuration}ms`}}>
                <div className={styles.modal__body} style={{display: isModalContent ? "flex" : "none"}}>
                    {children}
                </div>

            </div>
        </div>
    );
};

export default Modal;