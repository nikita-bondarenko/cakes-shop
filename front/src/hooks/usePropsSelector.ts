import {useAppSelector} from "./redux";

export const usePropsSelector = (type: string) => {
    const props = useAppSelector(state => state.props)
    // @ts-ignore
    return props[type]
}