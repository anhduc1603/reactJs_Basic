import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row } from "react-bootstrap"; // Đổi từ antd sang bootstrap
import { FaGoogle, FaFacebook } from "react-icons/fa";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
        navigate("/dashboard");
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        await login(username, password);
        navigate("/dashboard");
    };

    const handleFacebookLogin = async (e) => {
        e.preventDefault();
        await login(username, password);
        navigate("/dashboard");
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
                        <Button
                            variant="outline-primary"
                            className="w-100 d-flex align-items-center justify-content-center"
                            onClick={handleFacebookLogin}
                        >
                            <FaFacebook className="me-2" /> Login with Facebook
                        </Button>
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
        </Container>
    );
};

export default Login;
