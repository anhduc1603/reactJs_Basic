// src/components/FacebookLoginButton.js
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ onLoginSuccess, onLoginFailure }) => {

    const responseFacebook = (response) => {
        if (response.accessToken) {
            console.log('Facebook login success:', response);

            // Extract info
            const accessToken = response.accessToken;
            const userID = response.userID;
            const email = response.email;
            const name = response.name;
            const picture = response.picture?.data?.url;
            const expiry = response.expiresIn;

            // Call Backend API
            fetch('http://localhost:8080/auth/facebook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    accessToken,
                    userID,
                    email,
                    name,
                    picture,
                    expiry,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('Backend response:', data);
                    // Save token, session, etc. tùy bạn muốn
                    localStorage.setItem('jwt_token', data.token);

                    // Gọi callback cho cha (nếu cần)
                    if (onLoginSuccess) {
                        onLoginSuccess(data);
                    }

                    // Redirect (tuỳ bạn muốn ở đây hay để ở component cha)
                    window.location.href = '/dashboard';
                })
                .catch((err) => {
                    console.error(err);
                    if (onLoginFailure) {
                        onLoginFailure(err);
                    }
                });

        } else {
            console.log('Facebook login failed:', response);
            if (onLoginFailure) {
                onLoginFailure(response);
            }
        }
    };

    return (
        <FacebookLogin
            appId="1071301685024195"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            scope="email,public_profile"
            cookie={true}
            returnScopes={true}
            authType="rerequest"
        />
    );
};

export default FacebookLoginButton;
