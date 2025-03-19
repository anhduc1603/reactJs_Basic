import React, { useState } from 'react';
import { Button, Card, Form, FormControl, InputGroup, Table, Spinner, Alert } from "react-bootstrap";
import {API_GET_ITEM_BY_SEARCH, API_URL} from "../../constants";

function Search() {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (query.trim().length === 0) return;
        setError("");
        setLoading(true);

        try {
            const url = `${API_URL}${API_GET_ITEM_BY_SEARCH}${encodeURIComponent(query)}`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`
                }
            });
            if (!response.ok) throw new Error("Lỗi khi gọi API");
            const result = await response.json();
            setResults(result.data || []);
        } catch (err) {
            setError(err.message);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            {/* Form tìm kiếm */}
            <Card className="shadow-sm p-3 mb-4 rounded-3 border-0">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label className="fw-semibold" >🔍 Nhập thông tin tìm kiếm</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl
                                placeholder="Nhập SĐT, email, tài khoản..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button variant="dark" type="submit">
                                {loading ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    "🔍 Tìm kiếm"
                                )}
                            </Button>
                        </InputGroup>
                        {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
                    </Form.Group>
                </Form>
            </Card>

            {/* Bảng kết quả */}
            {results.length > 0 && (
                <Card className="shadow-sm p-3 mb-4 rounded-3 border-0">
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                        <tr>
                            <th>STT</th>
                            <th>Info</th>
                            <th>Content</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.info}</td>
                                <td>{item.content} ***</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card>
            )}

            {/* Nếu không có kết quả */}
            {results.length === 0 && !loading && (
                <div className="text-center text-muted">Không có kết quả</div>
            )}
        </div>
    );
}

export default Search;
