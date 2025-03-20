import React from 'react';
import {Button} from 'react-bootstrap';
import {LOGIN_GOOGLE} from "../../constants";

const LoginWithGoogle = () => {
    const backendURL = process.env.REACT_APP_API_URL_BACKEND;
    const handleLogin = () => {
        // Redirect tới endpoint backend để login Google
        const url = `${backendURL}${LOGIN_GOOGLE}`;

        window.location.href = url
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Button variant="danger" onClick={handleLogin}>
                <i className="bi bi-google me-2"></i> Login with Google
            </Button>
        </div>
    );
};

export default LoginWithGoogle;
