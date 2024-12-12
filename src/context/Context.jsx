import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();
export function useMyContext() {
    return useContext(UserContext);
}
export default function UserContextProvider({ children }) {

    const [userData, setUserData] = useState({});
    const [isLogin, setIsLogin] = useState(localStorage.getItem("user token") ? true : false);
    const [isSearching, setIsSearching] = useState(false);

    function getUserData() {
        const token = localStorage.getItem('user token')
        if (token) {
            const decoded = jwtDecode(token);
            setUserData(decoded);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('user token')
        if (token) {
            getUserData();
        }
    }, []);
    return (
        <UserContext.Provider
            value={{
                isLogin,
                setIsLogin,
                userData,
                setUserData,
                isSearching,
                setIsSearching
            }}>
            {children}
        </UserContext.Provider>
    );
}