import React from "react";

const clientId = "170170392072-sa58g53ntplofuf13qimbvmbfarsecbp.apps.googleusercontent.com"; // Thay bằng Client ID của bạn

const LoginWithGoogle = () => {

    return (
        <div>
            <h1>Login with Google</h1>
            <a href="http://localhost:8080/auth/login">
                <button>Login with Google</button>
            </a>
        </div>
    );
};

export default LoginWithGoogle;
