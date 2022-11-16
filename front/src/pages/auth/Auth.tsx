import React, {useEffect, useState} from 'react';
import TextNumberInput from "../../components/UI/inputs/text-number/TextNumberInput";
import {useAppSelector} from "../../hooks/redux";
import ButtonPrime from "../../components/UI/buttons/button-prime/ButtonPrime";
import {
    useCreateUserMutation,
    useLoginByEmailMutation,
    useLoginMutation
} from "../../store/auth/auth.api";
import Loader from "../../components/UI/loader/Loader";
import {JWT_KEY} from "../../config";
import {useNavigate} from "react-router-dom";
import ErrorPost from "../../components/UI/error-post/ErrorPost";
import styles from "./Auth.module.scss";
import {decodeToken} from "react-jwt";
import {useActions} from "../../hooks/actions";
import ButtonSecondary from "../../components/UI/buttons/button-secondary/ButtonSecondary";
import EmailInput from "../../components/UI/inputs/email/EmailInput";

const Auth = () => {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const {errors} = useAppSelector(state => state.ui)
    const [createUser, {isLoading: isCreatingUserLoading}] = useCreateUserMutation()
    const navigate = useNavigate()
    const [login, {isLoading: isLoginLoading, error}] = useLoginMutation()
    const {setUserState, setRedirectedFrom} = useActions()
    const [loginByEmail, {isLoading: isLoginByEmailLoading}] = useLoginByEmailMutation()
    const {redirectedFrom} = useAppSelector(state => state.auth)
    const {user} = useAppSelector(state => state.user)


    const saveUser = (token: string) => {
        const decodedToken = decodeToken(token)
        setUserState(decodedToken)
        localStorage.setItem(JWT_KEY, token)
        if (!!redirectedFrom) {
            navigate(redirectedFrom)
            setRedirectedFrom('')
            return
        }
        navigate("/profile")
    }

    useEffect(() => {
        if (user.id) navigate("/profile")
    }, [user])

    const loginAccount = () => {
        // @ts-ignore
        login({email, password}).then(({data}) => {
            if (data && data.token) {
                saveUser(data.token)
            }

        })
    }

    const [isPasswordForgotten, setIsPasswordForgotten] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isUser, setIsUser] = useState(false)

    const finish = ({email, code} : {email: string, code: string}) => {
        if (isPasswordForgotten) {

            // @ts-ignore
            loginByEmail({email}).then(({data}) => {
                if (data && data.token) {
                    saveUser(data.token)
                }
            })

        } else {
            // @ts-ignore
            createUser({email, password: code}).then(({data}) => {
                if (data && data.token) {
                    saveUser(data.token)
                }
            })
        }
    }

    return (
        isCreatingUserLoading ? <Loader isBig={true}></Loader>
            :
            <div>
                <h1 className={"page-title"}>
                    Вход
                </h1>
                <p className={styles.text}>Введите ваш email независимо от того есть ли у вас аккаунт. Если вы не
                    зарегистрированы или не помните пароль, вам потребуется всего лишь подтвердить свою почту. Письмо может попасть в спам.</p>
                <EmailInput onChangeEmail={value => setEmail(value)} onConfirmSuccessful={value => finish(value)} isPasswordForgotten={isPasswordForgotten}
                            onChangeIsValidEmail={value => setIsValidEmail(value)}
                            onChangeIsUser={value => setIsUser(value)}
                ></EmailInput>
                {(isUser && isValidEmail) && <div className={styles.body}>
                    <TextNumberInput label={"Пароль"} type={"password"} value={password}
                                     onChange={(value) => setPassword(String(value))}></TextNumberInput>
                    <ButtonSecondary className={styles.button_forgotten} onClick={() => setIsPasswordForgotten(true)}> Я не помню свой
                        пароль </ButtonSecondary>
                    <div className={styles.button_block}>
                        <ButtonPrime className={styles.button} disabled={!!errors.length}
                                     onClick={() => (setIsPasswordForgotten(false), loginAccount())}>
                            Войти
                        </ButtonPrime>
                        {isLoginLoading && <Loader className={styles.loading}></Loader>}
                        {(error && !isLoginLoading) && <ErrorPost>
                            Неверный пароль
                        </ErrorPost>}
                    </div>

                </div>}
            </div>
    );
};

export default Auth;