import {useEffect, useState} from "react";

export const useFetchingOnScroll = () => {
    const [fetching, setFetching] = useState(true) as [boolean, Function]

    const scrollHandler = (e: any) => {
        if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 300)) {
            setFetching(true)
        }
    }

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler)
        return () => {
            document.removeEventListener("scroll", scrollHandler)
        }
    }, [])

    return [fetching, setFetching]
}