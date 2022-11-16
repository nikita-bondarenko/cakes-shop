import React, {useEffect, useState} from 'react';
import TextNumberInput from "../text-number/TextNumberInput";
import {useDebounce} from "../../../../hooks/useDebounce";
import styles from "../../../../pages/auth/Auth.module.scss";
import ButtonPrime from "../../buttons/button-prime/ButtonPrime";
import Loader from "../../loader/Loader";
import {getCode} from "../../../../hooks/useCode";
import {useConfirmEmailMutation} from "../../../../store/auth/auth.api";
import {useAppSelector} from "../../../../hooks/redux";
import {useLazyIsEmailUniqueQuery} from "../../../../store/user/user.api";

interface Props {
    onChangeIsUser?: (value: boolean) => void,
    onChangeIsValidEmail?: (value: boolean) => void
    isPasswordForgotten?: boolean
    onConfirmSuccessful: ({email, code}: { email: string, code: string }) => void,
    onChangeEmail: (value: string) => void,
    value?: string | null,
    id?: number,
    isConfirmationOpen?: boolean
}

const EmailInput = (
    {
        onChangeIsValidEmail,
        onChangeIsUser,
        isPasswordForgotten,
        onConfirmSuccessful,
        onChangeEmail,
        value = '',
        id,
        isConfirmationOpen
    }: Props
) => {
    const [email, setEmail] = useState(value || '')
    const debounce = useDebounce(email)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isUniqueEmailFetch, {data: isUniqueEmail}] = useLazyIsEmailUniqueQuery()
    const [isUserSearchLoading, setIsUserSearchLoading] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [code, setCode] = useState('')
    const [savedEmail, setSavedEmail] = useState('')
    const [confirmEmail, {isLoading: isConfirmationLoading}] = useConfirmEmailMutation()
    const [codeInputValue, setCodeInputValue] = useState('')
    const {errors} = useAppSelector(state => state.ui)
    const [time, setTime] = useState(0)

    useEffect(() => {
        value && setEmail(value)
    }, [value])


    useEffect(() => {
        if (!!code && !!codeInputValue && code === codeInputValue) {
            onConfirmSuccessful({email: savedEmail, code: codeInputValue})
            setCodeInputValue('')
        }
    }, [codeInputValue])

    useEffect(() => {
        onChangeIsValidEmail &&  onChangeIsValidEmail(isValidEmail)
        onChangeIsUser && onChangeIsUser(isUser)
        onChangeEmail(email)
    }, [email, isUser, isValidEmail])

    useEffect(() => {
        setIsUser(!isUniqueEmail)
    }, [isUniqueEmail])

    useEffect(() => {
        setIsValidEmail(!!email && email.includes("@") && email.includes("."))
    }, [email])
    useEffect(() => {
        if (isValidEmail && debounce) {
            setIsUserSearchLoading(true)
            isUniqueEmailFetch({email:debounce, id}).finally(() => setIsUserSearchLoading(false))
        }
    }, [debounce])

    useEffect(() => {
        !!time && setTimeout(() => setTime(time - 1), 1000)
    }, [time])

    const sendCode = () => {
        setTime(30)
        const code = getCode()
        setCode(code)
        setSavedEmail(email)
        try {
            confirmEmail({token: code, email})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <TextNumberInput loading={isUserSearchLoading} error={!isValidEmail ? "Неверный формат" : (!!id && isUser) && "Пользователь с таким email уже есть"}
                             label={"Email"}
                             type={"email"}
                             value={email}
                             onChange={(value) => setEmail(String(value).trim())}></TextNumberInput>
            {(isConfirmationOpen) && <div className={styles.body}>
                <p>Чтобы установить новый email, вам необходимо подтвердить, что он действительно пренадлежит вам. Для этого необходимо просто ввести код, который мы отправим на новый адрес. Письмо может попасть в спам. </p>
                <div className={styles.button_block}>
                    <ButtonPrime isLoading={isConfirmationLoading} onClick={() => sendCode()} disabled={!!errors.length || !!time}>Отправить
                        код</ButtonPrime>
                    {!!time &&
                        <span className={styles.text_small}>Повторная отправка кода возможна через {time} c.</span>}
                </div>
                <TextNumberInput required={false} label={"Код подтверждения"} type={"number"}
                                 value={codeInputValue}
                                 onChange={(value) => setCodeInputValue(String(value))}></TextNumberInput>
            </div>}
            {(!isUser && isValidEmail && !isUserSearchLoading && !id) && <div className={styles.body}>
                <div className={styles.button_block}>
                    <ButtonPrime isLoading={isConfirmationLoading} onClick={() => sendCode()} disabled={!!errors.length || !!time}>Отправить
                        код</ButtonPrime>
                    {!!time &&
                        <span className={styles.text_small}>Повторная отправка кода возможна через {time} c.</span>}
                </div>
                <TextNumberInput required={false} label={"Код подтверждения"} type={"number"}
                                 value={codeInputValue}
                                 onChange={(value) => setCodeInputValue(String(value))}></TextNumberInput>
            </div>}
            {(isUser && isValidEmail && isPasswordForgotten && !id) && <div className={styles.body}>
                <div className={styles.button_block}>
                    <ButtonPrime isLoading={isConfirmationLoading} onClick={() => sendCode()} disabled={!!time}>Отправить
                        код</ButtonPrime>
                    {!!time &&
                        <span
                            className={styles.text_small}>Повторная отправка кода возможна через {time} c.</span>}
                </div>
                <TextNumberInput required={false} label={"Код подтверждения"} type={"number"}
                                 value={codeInputValue}
                                 onChange={(value) => setCodeInputValue(String(value))}></TextNumberInput>
            </div>}
        </div>
    );
};

export default EmailInput;