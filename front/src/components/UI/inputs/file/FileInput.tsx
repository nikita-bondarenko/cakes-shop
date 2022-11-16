import React, {ChangeEventHandler, createRef, useEffect} from 'react';
import {BASE_URL_API} from "../../../../config";
import {useDeleteFileMutation, useUploadMutation} from "../../../../store/file/file.api";
import styles from './FileInput.module.scss';
import ButtonSecondary from "../../buttons/button-secondary/ButtonSecondary";
import Loader from "../../loader/Loader";
import ErrorSuccess from "../error-success/ErrorSuccess";

interface Props {
    value: string;
    setValue: (arg: string) => void ;
    required?: boolean;
    className?: string;
    deleteFileOnChange?: boolean
}

const FileInput = ({value, setValue, required = false, className, deleteFileOnChange = false}: Props) => {

    const ref = createRef<HTMLInputElement>()

    const [upload, {data: picture, isLoading}] = useUploadMutation()
    const [deleteFile] = useDeleteFileMutation()

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files?.length) {
            const form = new FormData()
            form.append('picture', files[0])
            upload(form)
        }
    }

    useEffect(() => {
        (picture && value && deleteFileOnChange) && deleteFile(value)
        picture && setValue(picture)
    }, [picture])

    return (

        <ErrorSuccess className={className} error={(!value && required && !isLoading) && "Необходимо загрузить изображение"}>
            <div className={styles.body}>
                {(value || isLoading) &&<div className={styles.wrapper}>
                    {(value && !isLoading) &&
                        <img className={styles.image} src={BASE_URL_API + '/' + value} alt=""/>
                    }
                    {isLoading && <Loader className={styles.loader}></Loader>}

                </div>}
                <input type="file" style={{display: 'none'}} onChange={onChange} ref={ref} accept="image/*"/>
                <ButtonSecondary type={value ? "add" : "delete"} onClick={() => ref.current?.click()}>{value ? "Изменить изображение" :'Загрузить изображение'}</ButtonSecondary>
            </div>
        </ErrorSuccess>

    );
};

export default FileInput;