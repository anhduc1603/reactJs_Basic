import {createContext, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {API_LOGIN, API_URL} from "../../constants";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // 🔥

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            try {
                const decoded = jwtDecode(savedToken); // Giải mã token
                setUser(decoded); // Gán thông tin user
            } catch (error) {
                console.error("Invalid token", error);
                setUser(null);
            }
        }
        setLoading(false); // ✅ Kết thúc loading
    }, []);

    const login = async (username, password) => {
        const response = await fetch(API_URL + API_LOGIN, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            setUser(data);
        } else {
            console.error("Login failed:", data.error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };


    return (
        <AuthContext.Provider value={{user, login, logout,loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}


export const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.role;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};


export const getUserID = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.id;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};