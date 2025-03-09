import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error state

        try {
            // const response = await fetch(`http://localhost:8080/v1/items?search=${encodeURIComponent(query)}`);
            const response = await fetch(`http://localhost:8080/v1/items`);

            if (!response.ok) {
                throw new Error("Lỗi khi gọi API");
            }

            const result = await response.json();
            setResults(result.data || []);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center vh-100">
            {/* Form tìm kiếm */}
            <Form onSubmit={handleSubmit} className="p-4 shadow rounded" style={{ width: "400px", background: "#f8f9fa" }}>
                <Form.Group className="mb-3">
                    <Form.Label>Input search</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Find with phone, email, account, etc."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Search
                </Button>
            </Form>

            {/* Hiển thị lỗi nếu có */}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {/* Hiển thị kết quả */}
            {results.length > 0 && (
                <ListGroup className="mt-4 w-50">
                    {results.map((item) => (
                        <ListGroup.Item key={item.id} className="d-flex flex-column">
                            <strong>{item.info}</strong>
                            <span>{item.content}</span>
                            <small className="text-muted">User ID: {item.user_id} | Status: {item.status}</small>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
}

export default Search;