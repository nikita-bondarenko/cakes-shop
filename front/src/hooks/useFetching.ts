import {useState} from "react";

export const useFetching = (callback: any) => {
    const [isLoading, setIsLoading] = useState(false) as [boolean, any]
    const [error, setError] = useState('') as [string, any]

    const fetching = async (...args: any): Promise<any> => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
}