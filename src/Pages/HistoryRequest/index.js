import React, {useEffect, useState} from "react";
import {
    Button, Form, Table, Alert, Card, Modal, Badge, Spinner, InputGroup, FormControl, OverlayTrigger
} from "react-bootstrap";
import {API_GET_ITEMS_BY_USERID, API_GET_LIST_ITEMS, API_UPDATE_ALL_STATUS, API_URL} from "../../constants";
import Tooltip from 'react-bootstrap/Tooltip';
import {Checkbox} from "antd";
import {getUserID} from "../../Components/Login/AuthContext";

function HistoryRequest() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkedItems,setCheckedItems] = useState(new Set());
    const [showConfirm, setShowConfirm] = useState(false);

    const handleShowConfirm = () => setShowConfirm(true);
    const handleCloseConfirm = () => setShowConfirm(false);

    const handleConfirmDelete = () => {
        handleDeleteAllCheck(); // Gọi hàm xóa hàng loạt
        handleCloseConfirm(); // Đóng modal
    };


    useEffect(() => {
        fetchData();
    }, []);


    const userIDGetItems = getUserID();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        console.log("userIDCheck" + userIDGetItems);
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

    const handleDelete = async  (id) => {
        console.log("id:=>" +id)
        setLoading(true);
        try {
            const response = await fetch(API_URL + API_UPDATE_ALL_STATUS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: Array.from( [id])}),
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

    const handleShowRequest = () => {
        setIsModalOpen(true);
    };



    const fetchData = async () => {
        setLoading(true);
        setError("");
        console.log("userIDCheck" + userIDGetItems);
        try {
            const url = `${API_URL}${API_GET_ITEMS_BY_USERID}${encodeURIComponent(userIDGetItems)}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error("Lỗi khi gọi API");
            const result = await response.json();
            setResults(result.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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

    const handleCheck = (id) => {
        setCheckedItems((prev) => {
            const newChecked = new Set(prev);
            newChecked.has(id) ? newChecked.delete(id) : newChecked.add(id);
            return newChecked;
        });
    };



    return (
        <div className="container mt-4">
            {/* Form tìm kiếm */}
            <Card className="shadow-sm p-3 mb-4 rounded-3 border-0">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label className="fw-semibold">🔍 Nhập thông tin tìm kiếm</Form.Label>
                        <InputGroup className="mb-2">
                            <FormControl
                                placeholder="Nhập SĐT, email, tài khoản..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                🔍 Tìm kiếm
                            </Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Card>

            {/* Hiển thị lỗi nếu có */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Hiển thị bảng kết quả */}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                results.length > 0 && (
                    <Table striped bordered hover responsive className="text-center align-middle shadow-sm">
                        <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>Chọn</th>
                            <th>SDT/Mail/TKCK</th>
                            <th>Trạng thái</th>
                            <th>Nội dung</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.map((item, index) => (
                            <tr key={item.id}>
                                <td className="fw-bold">{index + 1}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={checkedItems.has(item.id)}
                                        onChange={() => handleCheck(item.id)}
                                    />
                                </td>
                                <td className="text-nowrap">{item.info}</td>
                                <td>
                                    <Badge bg={item.status === 1 ? "success" : "primary"} className="p-2">
                                        {item.status === 1 ? "✅ Hoàn thành" : item.status === 2 ? "🔄 Đang xử lý" : "❓ Không xác định"}
                                    </Badge>
                                </td>
                                <td className="text-muted">****</td>
                                <td className="text-nowrap">
                                    <div className="d-flex justify-content-start" style={{ minWidth: "80px" }}>
                                        {/* Nút Xóa */}
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                                            🗑
                                        </Button>

                                        {/* Nút Show Request (chỉ hiển thị nếu item.status === 1) */}
                                        {item.status === 1 && (
                                            <Button variant="info" size="sm" className="ms-2" onClick={() => handleShowRequest(item)}>
                                                🔍
                                            </Button>
                                        )}
                                    </div>
                                </td>


                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )
            )}

            {/* Popup yêu cầu cài đặt phần mềm */}
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>🔐 Cài đặt Kaspersky</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Khách hàng cần cài đặt phần mềm Kaspersky Antivirus để đảm bảo an toàn.</p>
                    <p>
                        Bạn có thể tải xuống phần mềm{" "}
                        <a
                            href="https://www.kaspersky.com.vn/downloads/antivirus"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none fw-bold"
                        >
                            tại đây
                        </a>.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                        Đóng
                    </Button>
                    <Button
                        variant="primary"
                        href="https://www.kaspersky.com.vn/downloads/antivirus"
                        target="_blank"
                    >
                        🚀 Tải xuống
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Nút xóa hàng loạt */}
            <div className="d-flex justify-content-end mt-3">
                <OverlayTrigger overlay={<Tooltip>Xóa các mục đã chọn!</Tooltip>}>
                    <span>
                        <Button
                            variant="danger"
                            onClick={handleShowConfirm} // Hiển thị modal xác nhận
                            disabled={checkedItems.size === 0}
                            className="fw-bold"
                        >
                            🗑 Xóa đã chọn
                        </Button>
                    </span>
                </OverlayTrigger>
            </div>

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

export default HistoryRequest;
