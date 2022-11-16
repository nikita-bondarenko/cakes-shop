import React, {ChangeEvent, createRef, useEffect, useState} from 'react';
import {arrTypes, Picture} from "../../../types";
import {useDeleteFileMutation, useUploadMutation} from "../../../store/file/file.api";
import {BASE_URL_API} from "../../../config";
import {useAppSelector} from "../../../hooks/redux";
import {useActions} from "../../../hooks/actions";
import FileInput from "../../UI/inputs/file/FileInput";
import styles from './PicureInput.module.scss'
import RadioInput from "../../UI/inputs/radio/RadioInput";

interface Props {
    initial: Picture,
    update: (arg: Picture) => void
}

const PictureInput: React.FC<Props> = ({update, initial}: Props) => {

    const {pictures, mainPicture} = useAppSelector(state => state.product)
    const {set} = useActions()
    const [pictureValue, setPictureValue] = useState(initial.value)

    useEffect(() => {
        update({...initial, value: pictureValue, main: pictureValue === mainPicture})
    }, [pictureValue, mainPicture])

    useEffect(() => {

        const picture: Picture | undefined = pictures.find(item => item.main)
        if (picture && mainPicture !== picture.value) {
            set({type: arrTypes.MAIN, value: picture.value})
        }

    }, [pictures.length])


    const [isCreation, setIsCreation] = useState(false)

    useEffect(() => {
        setIsCreation(window.location.pathname.includes("create"))

    }, [])

    return (
        <div className={styles.body}>

            <FileInput deleteFileOnChange={isCreation} required={true} value={pictureValue} setValue={(value) => setPictureValue(value)}></FileInput>
            {(pictures.filter(item => item.value).length > 1 && pictureValue) &&
                <RadioInput className={styles.radio} onSelect={(value) => set({type: arrTypes.MAIN, value})} label="Отображать в каталоге" checked={mainPicture === pictureValue} value={pictureValue} name="main-picture" ></RadioInput>}
        </div>

    );
};

export default PictureInput;