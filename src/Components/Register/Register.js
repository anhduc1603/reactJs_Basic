import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import {API_REGISTER, API_URL} from "../../constants";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Gửi request đến API đăng ký (giả định API_URL có endpoint /register)
        const response = await fetch(API_URL+API_REGISTER, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            navigate("/login");
        } else {
            console.error("Registration failed");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: "400px", padding: "20px" }}>
                <h3 className="text-center">Create Account</h3>
                <Form onSubmit={handleRegister}>
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
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <Button variant="success" type="submit" className="w-100">
                        Register
                    </Button>
                </Form>
                <hr />
                <div className="text-center">
                    <span>Already have an account?</span>
                    <Button
                        variant="link"
                        className="p-0 ms-2"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                </div>
            </Card>
        </Container>
    );
};

export default Register;
