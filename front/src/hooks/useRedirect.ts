import {useNavigate} from "react-router-dom";
import {useAppSelector} from "./redux";
import {useActions} from "./actions";

export const useRedirect = () => {
    const {redirectedFrom} = useAppSelector(state => state.auth)
    const {setRedirectedFrom} = useActions()
    const navigate = useNavigate()
    return () => {
        navigate(redirectedFrom ? redirectedFrom : '/')
        setRedirectedFrom('')
    }

}