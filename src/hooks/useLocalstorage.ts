import { useEffect, useState } from "react";

export const useLocalStorage = (keyName: string) => {
    const [storedValue, setStoredValue] = useState(null);

    useEffect(() => {
        let user = localStorage.getItem(keyName);
        if (user) {
            setStoredValue(JSON.parse(user));
        }
    }, []);

    const setValue = (keyName: string, newValue: any) => {
        localStorage.setItem(keyName, JSON.stringify(newValue));
    };

    return { storedValue, setValue };
};
