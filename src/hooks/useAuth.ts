import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalstorage";

// returns currently authenticated user from localstorage
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const { storedValue }: any = useLocalStorage("user");

    useEffect(() => {
        if (storedValue?.jwtToken) {
            setUser(storedValue.user);
        }
    }, [storedValue]);

    const getJwtToken = () => {
        return storedValue?.jwtToken;
    };

    return { user, getJwtToken };
};
