import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");

        if (token) {
            // Lưu token
            localStorage.setItem("token", token);
            // Redirect Dashboard
            navigate("/dashboard");
        } else {
            // Không có token → quay lại login
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <h3>Processing login...</h3>
        </div>
    );
};

export default OAuthSuccess;
