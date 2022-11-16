import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import ButtonSecondary from "../../components/UI/buttons/button-secondary/ButtonSecondary";
import {JWT_KEY} from "../../config";
import {useActions} from "../../hooks/actions";
import FileInput from "../../components/UI/inputs/file/FileInput";
import TextNumberInput from "../../components/UI/inputs/text-number/TextNumberInput";
import ButtonPrime from "../../components/UI/buttons/button-prime/ButtonPrime";
import Loader from "../../components/UI/loader/Loader";
import ErrorPost from "../../components/UI/error-post/ErrorPost";
import {useUpdateMutation} from "../../store/user/user.api";
import EmailInput from "../../components/UI/inputs/email/EmailInput";
import Block from "../../components/UI/block/Block";
import styles from './Profile.module.scss';
import Section from "../../components/UI/section/Section";

const Profile = () => {

    const navigate = useNavigate()
    const {setUserState} = useActions()
    const {user} = useAppSelector(state => state.user)
    const [picture, setPicture] = useState(null) as [null | string, Function]
    const [name, setName] = useState(null) as [null | string, Function]
    const [email, setEmail] = useState(null) as [null | string, Function]
    const [password, setPassword] = useState(null) as [null | string, Function]
    const [comment, setComment] = useState(null) as [null | string, Function]
    const [isChanged, setIsChanged] = useState(false)
    const [confirmedEmail, setConfirmedEmail] = useState('')
    const [isEmailChanged, setIsEmailChanged] = useState(false)
    const [isPasswordChanging, setIsPasswordChanging] = useState(false)
    const {errors} = useAppSelector(state => state.ui)

    const logout = () => {
        localStorage.removeItem(JWT_KEY)
        setUserState({})
        navigate("/auth")
    }

    useEffect(() => {
        if(!localStorage.getItem(JWT_KEY))  navigate("/auth")
    }, [])

    const [updateUser, {isLoading}] = useUpdateMutation()

    useEffect(() => {
        setPicture(user.picture)
        setName(user.name)
        setEmail(user.email)
        user.globalComment && setComment(user.globalComment.text)
    }, [user])


    useEffect(() => {
        if (user.name != name || user.picture != picture || isEmailChanged || (user.globalComment && user.globalComment.text != comment) || isPasswordChanging) {
            setIsChanged(true)
        } else {
            setIsChanged(false)
        }
    }, [picture,
        name,
        isEmailChanged,
        isPasswordChanging,
        comment])

    useEffect(() => {
        (!!email && !!user.email) && setIsEmailChanged(user.email !== email)
    }, [email])

    const update = () => {
        updateUser({
            id: user.id, body: {
                ...(isEmailChanged && email === confirmedEmail ? {email} : {}),
                ...(isPasswordChanging ? {password} : {}),
                name,
                picture,
                ...(!!comment ? {globalComment: {text: comment}} : {})
            }
        }).then(res => {
            // @ts-ignore
            if (res.data) {
                // @ts-ignore
                setUserState(res.data)
                setPassword('')
                setIsChanged(false)
                setIsEmailChanged(false)
                setIsPasswordChanging(false)
            }
        })
    }

    return (
        <div className={styles.body}>
            <h1 className={"page-title"}>Страница пользователя</h1>
            <Section>
                <FileInput value={picture || ""} setValue={value => setPicture(value)}></FileInput>
                <p className={styles.text}>Это фото будет отображаться при просмотре отзывов, которые вы оставите.</p>
            </Section>
            <Section>
                <TextNumberInput required={false} label={"Имя"} value={name}
                                 onChange={value => setName(String(value))}></TextNumberInput>
                <p className={styles.text}>Имя будет отображаться при просмотре отзывов, которые вы оставите.</p>
            </Section>
            <Section>
                <EmailInput isConfirmationOpen={isEmailChanged && email !== confirmedEmail} id={user.id} value={email}
                            onConfirmSuccessful={({email}) => setConfirmedEmail(email)}
                            onChangeEmail={value => setEmail(value)}></EmailInput>
                <p className={styles.text}>По этому адресу мы будем связываться с вами, чтобы уточнить детали
                    доставки.</p>
            </Section>

            {/*<Section>*/}
            {/*    <TextNumberInput required={false} type={"textarea"} label={"Отзыв"} value={comment}*/}
            {/*                     onChange={value => setComment(String(value))}/>*/}
            {/*    <p className={styles.text}>Ваш отзыв будет отображен на главной странице.</p>*/}
            {/*</Section>*/}

            <Section className={["column", styles.password].join(' ')}>
                <ButtonSecondary
                    onClick={() => setIsPasswordChanging(!isPasswordChanging)}> {isPasswordChanging ? 'Отмена смены пароля' : 'Хочу изменить пароль'}</ButtonSecondary>
                {isPasswordChanging && <div>
                    <TextNumberInput label={"Новый пароль"} value={password}
                                     onChange={value => setPassword(String(value))}></TextNumberInput>
                </div>}
            </Section>

            <ButtonPrime
                isLoading={isLoading}
                className={!isChanged || (isEmailChanged && email !== confirmedEmail) || !!errors.length || isLoading ? "disabled" : ""}
                onClick={() => update()}> Сохранить
                изменения</ButtonPrime>
            {(!!errors.length && !!email) && <ErrorPost>Все необходимые поля должны быть заполнены</ErrorPost>}
            <Section className={"column"}>
                <ButtonSecondary onClick={() => logout()} type={"delete"}>Выйти из профиля</ButtonSecondary>
            </Section>
        </div>
    );
};

export default Profile;