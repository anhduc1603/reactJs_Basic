// src/components/FacebookLoginButton.js
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ onLoginSuccess, onLoginFailure }) => {

    const responseFacebook = (response) => {
        if (response.accessToken) {
            console.log('Facebook login success:', response);
            onLoginSuccess(response);
        } else {
            console.log('Facebook login failed:', response);
            onLoginFailure(response);
        }
    };

    return (
        <FacebookLogin
            appId="1071301685024195" // Thay bằng Facebook App ID
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            scope="email,public_profile"
            isSignedIn={true}
            cookie={true}
            returnScopes={true}
            authType="rerequest"
        />
    );
};

export default FacebookLoginButton;
