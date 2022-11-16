import React, {ChangeEvent, ChangeEventHandler, FocusEventHandler} from 'react';
import styles from './Textarea.module.scss';
import {Properties} from "csstype";

interface Props {
    className?: string,
    style?: any,
    onChange: ChangeEventHandler<HTMLTextAreaElement>,
    value: string,
    onFocus?: FocusEventHandler<HTMLTextAreaElement>,
    onBlur?: () => void,
    label?:string
    rows?:number,
}

const Textarea = ({className,style,onChange,value, onFocus, onBlur, label, rows = 6} : Props) => {

    // const autosize = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    //     const el = e.target as HTMLTextAreaElement
    //     if (el.scrollHeight > 30 && el.scrollHeight < 180) el.style.height = `${el.scrollHeight}px`
    // }

    return (
        <div className={styles.form}>
            <textarea name={"text"} onFocus={onFocus} onBlur={onBlur}  value={value} style={style} onChange={onChange} className={[styles.textarea, className].join(' ')} rows={rows}></textarea>
                <label htmlFor="text" className={styles.label_name}>
                    <span className={styles.content_name}>{label}</span>
                </label>
        </div>
    );
};

export default Textarea;