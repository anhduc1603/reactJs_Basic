// src/components/FacebookLoginButton.js
import React from 'react';
import {Button} from 'react-bootstrap';
import FacebookLogin from "@greatsumini/react-facebook-login";
import {FaFacebook} from "react-icons/fa";
import {LOGIN_FACEBOOK} from "../../constants";

const FacebookLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
    const appIdFb = process.env.REACT_APP_FACEBOOK_APP_ID;
    const backendURL = process.env.REACT_APP_API_URL_BACKEND;

    const handleSuccess = (response) => {
        console.log('Facebook login success:', response);
        const urlLoginFb = backendURL + LOGIN_FACEBOOK
        // Gửi accessToken tới backend
        fetch(urlLoginFb, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accessToken: response.accessToken,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Phản hồi từ backend:', data);

                if (onLoginSuccess) onLoginSuccess(data);

                // Chuyển hướng
                if (data.redirectURL) {
                    window.location.href = data.redirectURL;
                } else {
                    window.location.href = '/dashboard';
                }
            })
            .catch((err) => {
                console.error(err);
                if (onLoginFailure) onLoginFailure(err);
            });
    };

    const handleError = (error) => {
        console.log('Facebook login failed:', error);
        if (onLoginFailure) onLoginFailure(error);
    };

    return (
        <FacebookLogin
            appId={appIdFb}
            onSuccess={handleSuccess}
            onFail={handleError}
            render={({ onClick }) => (
                <Button
                    variant="primary"
                    className="w-100 d-flex align-items-center justify-content-center mb-2 py-2"
                    onClick={onClick}
                    style={{ height: '45px', fontWeight: '500', fontSize: '16px' }}
                >
                    <FaFacebook className="me-2" size={20} /> Login with Facebook
                </Button>
            )}
        />
    );
};

export default FacebookLoginButton;
