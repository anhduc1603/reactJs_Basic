import React, {useEffect, useState} from "react";
import {getUserID, useAuth} from "./AuthContext";
import {useNavigate} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap"; // Đổi từ antd sang bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import {FaGoogle} from "react-icons/fa";
import {API_SAVE_USER_LOGS, LOGIN_GOOGLE} from "../../constants";
import {getPublicIP} from "../../Utils/getPublicIP";
import FacebookLoginButton from "../../Button/FacebookLoginButton/FacebookLoginButton";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const backendURL = process.env.REACT_APP_API_URL_BACKEND;


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await login(username, password);
            if (success) {
                // Sau khi login thành công => Gọi API lưu user_logs
                const userIDGetItems = getUserID();
                if (!userIDGetItems) {
                    console.error("Không lấy được userID");
                    setErrorMessage("Có lỗi xảy ra!");
                    navigate("/dashboard");
                }
                const ipPublicUser = await getPublicIP();
                const logData = {
                    userid: userIDGetItems, // Giả sử backend trả về user_id
                    ip_public: ipPublicUser,
                    user_agent: navigator.userAgent,
                    action :"login"
                };
                const urlSaveUserLogs = backendURL + API_SAVE_USER_LOGS
                await fetch(urlSaveUserLogs, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"},
                    body: JSON.stringify(logData),
                });

                navigate("/dashboard");
            } else {
                setErrorMessage("Sai tài khoản hoặc mật khẩu!");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setErrorMessage("Lỗi server, vui lòng thử lại!");
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");

        if (token) {
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 3000); // 3s

            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const handleGoogleLogin = async (e) => {
        const url = `${backendURL}${LOGIN_GOOGLE}`;
        window.location.href = url
    };




    const handleLoginSuccess = (response) => {
        const accessToken = response.accessToken;
        const userID = response.userID;
        const email = response.email;
        const name = response.name;
        const picture = response.picture?.data?.url;
        const expiry = response.expiresIn; // in seconds (số giây)
        // Gửi token lên backend
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
                // Lưu JWT token hoặc session
            })
            .catch((err) => console.error(err));
    };

    const handleLoginFailure = (response) => {
        console.error('Failure:', response);
    };






    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: "400px", padding: "20px" }}>
                <h3 className="text-center">Login</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
                <hr />
                <Row>
                    <Col>
                        <Button
                            variant="outline-danger"
                            className="w-100 d-flex align-items-center justify-content-center mb-2"
                            onClick={handleGoogleLogin}
                        >
                            <FaGoogle className="me-2" /> Login with Google
                        </Button>
                    </Col>
                    <Col>
                        {/*<Button*/}
                        {/*    variant="outline-primary"*/}
                        {/*    className="w-100 d-flex align-items-center justify-content-center"*/}
                        {/*    onClick={handleFacebookLogin}*/}
                        {/*>*/}
                        {/*    <FaFacebook className="me-2" /> Login with Facebook*/}
                        {/*</Button>*/}
                            <FacebookLoginButton
                                onLoginSuccess={handleLoginSuccess}
                                onLoginFailure={handleLoginFailure}
                            />
                    </Col>
                </Row>
                <hr />
                <div className="text-center">
                    <span>Don't have an account?</span>
                    <Button
                        variant="link"
                        className="p-0 ms-2"
                        onClick={() => navigate("/register")}
                    >
                        Create Account
                    </Button>
                </div>
            </Card>


            {errorMessage && (
                <div
                    className="alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-3"
                    style={{ zIndex: 9999, width: "400px", textAlign: "center" }}
                    role="alert"
                >
                    {errorMessage}
                </div>
            )}
        </Container>
    );
};

export default Login;
