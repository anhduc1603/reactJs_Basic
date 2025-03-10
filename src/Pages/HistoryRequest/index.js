import React, { useState } from "react";
import { Button, Form, Input, Table, Alert, Checkbox, Card, Space, message,Modal } from "antd";

function HistoryRequest() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`http://localhost:8080/v1/items`);
            if (!response.ok) throw new Error("Lỗi khi gọi API");

            const result = await response.json();
            setResults(result.data || []);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = (id) => {
        setResults(results.filter((item) => item.id !== id));
        message.success("Xóa thành công!");
    };

    const confirm = () =>
        new Promise((resolve) => {
            setTimeout(() => resolve(null), 3000);
        });
    const handleShowRequest = () => {
        setIsModalOpen(true);
    };


    const columns = [
        { title: "#", dataIndex: "index", key: "index", render: (_, __, index) => index + 1 },
        { title: <Checkbox />, dataIndex: "checkbox", key: "checkbox", render: () => <Checkbox /> },
        { title: "SDT/Mail/TKCK", dataIndex: "info", key: "info" },
        { title: "Status", dataIndex: "status", key: "status" },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
            render: (text) => (
                <Space>
                    {"****"} {/* Hiển thị nội dung bị ẩn */}
                </Space>
            ),
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, item) => (
                <Space>
                    <Button type="primary" size="small" onClick={() => handleShowRequest(item)}>🔍 Hiển thị</Button>
                    <Button type="danger" size="small" onClick={() => handleDelete(item.id)}>🗑 Xóa</Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingTop: 30 }}>
            {/* Form tìm kiếm */}
            <Card style={{ width: 400, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                <Form onSubmitCapture={handleSubmit} layout="vertical">
                    <Form.Item label="Nhập thông tin tìm kiếm">
                        <Input
                            placeholder="Find with phone, email, account, etc."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </Form.Item>
                    <Button type="primary" block htmlType="submit">
                        🔍 Search
                    </Button>
                </Form>
            </Card>

            {/* Hiển thị lỗi nếu có */}
            {error && <Alert message={error} type="error" showIcon style={{ marginTop: 15 }} />}

            {/* Hiển thị bảng kết quả */}
            {results.length > 0 && (
                <Table
                    dataSource={results.map((item, index) => ({ ...item, key: item.id, index }))}
                    columns={columns}
                    style={{ marginTop: 20, width: "80%" }}
                    pagination={{ pageSize: 5 }}
                />
            )}

            {/* Popup yêu cầu cài đặt phần mềm */}
            <Modal
                title="Yêu cầu cài đặt phần mềm kaspersky antivirus"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalOpen(false)}>Đóng</Button>,
                    <Button key="download" type="primary" href="https://www.kaspersky.com.vn/downloads/antivirus" target="_blank">Tải xuống</Button>
                ]}
            >
                <p>Khách hàng cần cài đặt phần mềm kaspersky antivirus để đảm bảo an toàn.</p>
                <p>Bạn có thể tải xuống phần mềm <a target="_blank" rel="noopener noreferrer" href="https://www.kaspersky.com.vn/downloads/antivirus">tại đây</a>.</p>
            </Modal>
        </div>
    );
}

export default HistoryRequest;
