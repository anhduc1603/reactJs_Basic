import React, { useState } from "react";
import {
    Button, Form, Table, Alert, Card, Modal, Badge, Spinner, InputGroup, FormControl, OverlayTrigger
} from "react-bootstrap";
import { API_GET_LIST_ITEMS, API_URL } from "../../constants";
import Tooltip from 'react-bootstrap/Tooltip';

function HistoryRequest() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(API_URL + API_GET_LIST_ITEMS);
            if (!response.ok) throw new Error("Lỗi khi gọi API");

            const result = await response.json();
            setResults(result.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setResults(results.filter((item) => item.id !== id));
        setTimeout(() => alert("Xóa thành công!"), 500);
    };

    const handleShowRequest = () => {
        setIsModalOpen(true);
    };

    const renderTooltip = (message) => (
        <Tooltip  id="tooltip-disabled">{message}</Tooltip>
    );

    return (
        <div className="container mt-4">
            {/* Form tìm kiếm */}
            <Card className="shadow p-3 mb-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nhập thông tin tìm kiếm</Form.Label>
                        <InputGroup>
                            <FormControl
                                placeholder="Find with phone, email, account, etc."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button variant="primary" type="submit">🔍 Tìm kiếm</Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Card>

            {/* Hiển thị lỗi nếu có */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Hiển thị bảng kết quả */}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                results.length > 0 && (
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>#</th>
                            <th>SDT/Mail/TKCK</th>
                            <th>Status</th>
                            <th>Content</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td><Form.Check type="checkbox" /></td>
                                <td>{item.info}</td>
                                <td>
                                    <Badge bg={item.status === 1 ? "success" : "primary"}>
                                        {item.status === 1 ? "✅ Hoàn thành" : "🔄 Đang xử lý"}
                                    </Badge>
                                </td>
                                <td>****</td>
                                <td>
                                    <Button variant="info" size="sm" onClick={() => handleShowRequest(item)}>🔍</Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>🗑</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )
            )}

            {/* Popup yêu cầu cài đặt phần mềm */}
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Yêu cầu cài đặt phần mềm Kaspersky</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Khách hàng cần cài đặt phần mềm Kaspersky Antivirus để đảm bảo an toàn.</p>
                    <p>
                        Bạn có thể tải xuống phần mềm{" "}
                        <a href="https://www.kaspersky.com.vn/downloads/antivirus" target="_blank" rel="noopener noreferrer">
                            tại đây
                        </a>.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Đóng</Button>
                    <Button variant="primary" href="https://www.kaspersky.com.vn/downloads/antivirus" target="_blank">
                        Tải xuống
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default HistoryRequest;
