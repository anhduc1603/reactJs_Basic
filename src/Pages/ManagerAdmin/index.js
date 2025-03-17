import React, {useEffect, useState} from "react";
import {API_GET_LIST_ITEMS, API_UPDATE_ALL_STATUS, API_URL} from "../../constants";
import {
    Alert,
    Button,
    Card,
    Form,
    FormControl,
    InputGroup,
    Modal,
    OverlayTrigger,
    Spinner,
    Table
} from "react-bootstrap";
import {Checkbox} from "antd";
import Tooltip from 'react-bootstrap/Tooltip';

function ManagerAdmin() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [checkedItems, setCheckedItems] = useState(new Set()); // Lưu ID các dòng được chọn
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError("");
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

    const handleCheck = (id) => {
        setCheckedItems((prev) => {
            const newChecked = new Set(prev);
            newChecked.has(id) ? newChecked.delete(id) : newChecked.add(id);
            return newChecked;
        });
    };

    const handleDeleteAllCheck = async () => {
        if (checkedItems.size === 0) return;

        setLoading(true);
        try {
            const response = await fetch(API_URL + API_UPDATE_ALL_STATUS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: Array.from(checkedItems)}),
            });

            if (!response.ok) throw new Error("Lỗi khi cập nhật API");
            await fetchData(); // Load lại danh sách sau khi cập nhật
            setCheckedItems(new Set()); // Reset danh sách đã chọn
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderTooltip = (message) => (
        <Tooltip  id="tooltip-disabled">{message}</Tooltip>
    );

    const handleShowConfirm = () => setShowConfirm(true);
    const handleCloseConfirm = () => setShowConfirm(false);

    const handleConfirmDelete = () => {
        handleDeleteAllCheck(); // Gọi hàm xóa hàng loạt
        handleCloseConfirm(); // Đóng modal
    };

    return (
        <div className="container mt-4">
            {/* Form tìm kiếm */}
            <Card className="shadow p-3 mb-4">
                <Form onSubmit={(e) => { e.preventDefault(); fetchData(); }}>
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
                            <th>Chọn</th>
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
                                <td>
                                    <Checkbox
                                        checked={checkedItems.has(item.id)}
                                        onChange={() => handleCheck(item.id)}
                                    />
                                </td>
                                <td>{item.info}</td>
                                <td>
                                        <span className={`badge ${item.status === 1 ? 'bg-success' : 'bg-primary'}`}>
                                           {item.status === 1 ? "✅ Hoàn thành" : item.status === 2 ? "🔄 Đang xử lý" : "❓ Không xác định"}
                                        </span>
                                </td>
                                <td>****</td>
                                <td>


                                    <OverlayTrigger placement="top" overlay={renderTooltip("Điền thông tin")}>
                                        <Button variant="info" size="sm" onClick={() => console.log("Điền thông tin:", item)}>📝</Button>
                                    </OverlayTrigger>{ ' ' }

                                    <OverlayTrigger placement="top" overlay={renderTooltip("Thay đổi trạng thái")}>
                                        <Button variant="secondary" size="sm" onClick={() => console.log("Thay đổi trạng thái:", item)}>🔄</Button>
                                    </OverlayTrigger>{ ' ' }

                                    <OverlayTrigger placement="top" overlay={renderTooltip("Xóa request có ID")}>
                                        <Button variant="danger" size="sm" onClick={() => console.log("Xóa request có ID:", item.id)}>🗑</Button>
                                    </OverlayTrigger>{ ' ' }

                                    <OverlayTrigger placement="top" overlay={renderTooltip("Hiển thị thông tin")}>
                                        <Button variant="primary" size="sm" onClick={() => console.log("Hiển thị thông tin:", item)}>🔍</Button>
                                    </OverlayTrigger>{ ' ' }

                                    <OverlayTrigger overlay={renderTooltip("Upload file")}  container={document.body}>
                                        <Button variant="warning" size="sm" onClick={() => console.log("Upload file cho:", item)}>📤</Button>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )
            )}

            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Xóa đã chọn!</Tooltip>}>
                <Button
                    variant="danger"
                    onClick={handleShowConfirm} // Hiển thị modal xác nhận
                    disabled={checkedItems.size === 0}
                    className="fw-bold"
                >
                    🗑 Xóa đã chọn
                </Button>
            </OverlayTrigger>

            {/* Modal xác nhận xóa */}
            <Modal show={showConfirm} onHide={handleCloseConfirm} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa các mục đã chọn không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirm}>
                        ❌ Hủy
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        ✅ Xóa
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
}

export default ManagerAdmin;
