import { useState, useEffect, createContext, useContext } from "react";
import {jwtDecode} from "jwt-decode";
import {API_LOGIN, API_URL} from "../../constants";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (username, password) => {
        const response = await fetch(API_URL+API_LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        } else {
            console.error("Login failed:", data.error);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}



export const getUserRole = () => {
    const token = localStorage.getItem("user"); // Lấy token từ localStorage
    if (!token) return null; // Nếu không có token, trả về null

    try {
        const decoded = jwtDecode(token); // Giải mã token
        return decoded.role; // Giả sử role được lưu trong token
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};