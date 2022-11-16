import React, {FormEvent, useEffect, useState} from 'react';
import {User} from "../../types";
import {useLazyGetCommentsQuery} from "../../store/comment/comment.api";
import {BASE_URL_API, COMMENT_WEBSOCKET_SERVER_URL, socketTypes} from "../../config";
import io, {Socket} from "socket.io-client";
import {useAppSelector} from "../../hooks/redux";
import ButtonSecondary from "../UI/buttons/button-secondary/ButtonSecondary";
import DeletingConfirmModal from "../UI/modals/deleting-confirm/DeletingConfirmModal";
import {InView} from 'react-intersection-observer';
import styles from './Chat.module.scss';
import TextNumberInput from "../UI/inputs/text-number/TextNumberInput";
import ButtonPrime from "../UI/buttons/button-prime/ButtonPrime";
import ChangeCommentModal from "../UI/modals/change-comment/ChangeCommentModal";
import DirectModal from "../UI/modals/direct/DirectModal";

interface Comment {
    userId: number,
    text: string,
    id: number,
    user: User
}

interface Props {
    productId?: number;
}

const Chat = ({productId}: Props) => {

    const [socket, setSocket] = useState() as [Socket, Function]
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        const newSocket = io(COMMENT_WEBSOCKET_SERVER_URL);
        setSocket(newSocket);

        return () => {
            newSocket.close()
        };
    }, [setSocket])

    const [getComments] = useLazyGetCommentsQuery()
    const [comments, setComments] = useState([]) as [Comment[], Function]
    const [totalCount, setTotalCount] = useState(0)
    const {user} = useAppSelector(state => state.user)
    const [text, setText] = useState('')
    const [changedCommentId, setChangedCommentId] = useState(0)
    const [changedCommentText, setChangedCommentText] = useState('')
    const [updatedComment, setUpdatedComment] = useState() as [Comment, Function]
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isChangeModalOpen, setIsChangeModalOpen] = useState(false)
    const [isDirectModalOpen, setIsDirectModalOpen] = useState(false)
    const [deletingCommentId, setDeletingCommentId] = useState(0)
    const [deletedCommentId, setDeletedCommentId] = useState() as [number, Function]
    const [newComment, setNewComment] = useState() as [Comment, Function]
    const {isAdmin} = useAppSelector(state => state.auth)

    const limit = 5

    const updateComment = (updatedComment: { id: number, text: string }) => {
        const arr = JSON.parse(JSON.stringify(comments))
        const comment = arr.find((item: Comment) => item.id === updatedComment.id)
        if (comment) {
            comment.text = updatedComment.text
            setComments(arr)
        }
    }

    const getData = async () => {
        if (comments.length < totalCount || !totalCount) {
            const res = await getComments({
                ...(typeof productId === 'number'? {id: productId} : {}),
                body: {offset: comments.length, limit}
            })
            if (res.data) {
                setTotalCount(res.data.pagination.count)
                setComments([...comments, ...res.data.items])
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        fetching && getData()
    }, [fetching])

    useEffect(() => {
        if (updatedComment) {
            updateComment(updatedComment)
        }

    }, [updatedComment])

    useEffect(() => {
        if (newComment) {
            setComments([newComment, ...comments])
            setTotalCount(totalCount + 1)
        }
    }, [newComment])

    useEffect(() => {
        if (deletedCommentId) {
            const comment = comments.find(item => deletedCommentId === item.id)
            if (comment) {
                setComments(comments.filter(item => item.id !== deletedCommentId))
                setTotalCount(totalCount - 1)
            }
        }
    }, [deletedCommentId])

    useEffect(() => {
        if (socket) {
            socket.on(productId ? socketTypes.NEW : socketTypes.NEW_GLOBAL, (data) => {

                if (productId) {
                    if (productId === data.productId) {
                        setNewComment(data)
                    }

                } else {
                    setNewComment(data)
                }
            })

            socket.on(productId ? socketTypes.UPDATE : socketTypes.UPDATE_GLOBAL, (data) => {
                setUpdatedComment(data)
            })

            socket.on(productId ? socketTypes.DELETE : socketTypes.DELETE_GLOBAL, (data) => {
                setDeletedCommentId(data)
            })
        }

    }, [socket])

    const sendComment = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit(productId ? socketTypes.NEW : socketTypes.NEW_GLOBAL, {
            ...(productId ? {productId} : {}),
            userId: user.id, text
        })
        setText('')
    }

    const startChange = (comment: Comment) => {
        setChangedCommentId(comment.id)
        setChangedCommentText(comment.text)
        setIsChangeModalOpen(true)
    }

    const cancelChanging = () => {
        setChangedCommentId(0)
        setChangedCommentText('')
    }

    const saveChanging = (text: string) => {
        updateComment({id: changedCommentId, text})
        socket.emit(productId ? socketTypes.UPDATE : socketTypes.UPDATE_GLOBAL, {id: changedCommentId, text})
        cancelChanging()
    }

    const startDeleting = (id: number) => {
        setDeletingCommentId(id)
        setIsDeleteModalOpen(true)
    }

    const deleteComment = () => {
        setComments(comments.filter(item => item.id !== deletingCommentId))
        socket.emit(productId ? socketTypes.DELETE : socketTypes.DELETE_GLOBAL, deletingCommentId)
        setDeletingCommentId(0)
        setTotalCount(totalCount - 1)
    }


    return (
        <div>
            {user.id ? <form onSubmit={sendComment} action="">
                <TextNumberInput rows={2} required={false} type={"textarea"} label={"Ваш отзыв"} value={text}
                                 onChange={(value) => setText(String(value))}></TextNumberInput>
                <ButtonPrime className={!text.trim() ? "disabled" : ''} type={"submit"}>Отправить</ButtonPrime>
            </form> : <ButtonPrime onClick={() => setIsDirectModalOpen(true)}>Хочу оставить отзыв</ButtonPrime>}

            <ul className={styles.list}>
                {comments.map(comment =>
                    <li className={styles.item} key={comment.id}>
                        <div className={styles.item__top}>
                            <img
                                className={styles.image}
                                src={comment.user && comment.user.picture ? BASE_URL_API + '/' + comment.user.picture : "/images/avatar.png"}
                                alt=""/>
                            <p className={styles.name}>{comment.user.name || comment.user.email.split("@")[0]}</p>
                        </div>
                     <p className={styles.item__body} id={String(comment.id)}>
                                {comment.text}</p>
                        {(user.id === comment.userId || isAdmin) && <div className={styles.item__buttons}>
                            <ButtonSecondary className={styles.button} onClick={() => startChange(comment)}>Изменить</ButtonSecondary>
                            <ButtonSecondary onClick={() => startDeleting(comment.id)}
                                             type={"delete"}> Удалить</ButtonSecondary>
                        </div>}
                    </li>
                )}

            </ul>
            {!comments.length && <p className={styles.mock}>Отзывов пока нет</p>}
            <InView onChange={(inView, entry) => setFetching(inView)}></InView>
            <ChangeCommentModal text={changedCommentText} onChange={value => saveChanging(value)}
                                isModalOpen={isChangeModalOpen}
                                setIsModalOpen={(value) => setIsChangeModalOpen(value)}></ChangeCommentModal>
            <DeletingConfirmModal isModalOpen={isDeleteModalOpen} setIsModalOpen={value => setIsDeleteModalOpen(value)}
                                  text={"отзыв"} deleteOne={() => deleteComment()}></DeletingConfirmModal>
            <DirectModal isModalOpen={isDirectModalOpen} setIsModalOpen={value => setIsDirectModalOpen(value)}></DirectModal>
        </div>
    );
};

export default Chat;