import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, valueSet] = useState<T>(() => {
        const getValue = localStorage.getItem(key);
        if (getValue == null) {
            if (typeof initialValue === "function") {
                return (initialValue as () => T)();
            } else {
                return initialValue;
            }
        } else {
            return JSON.parse(getValue);
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, valueSet] as [T, typeof valueSet];
}