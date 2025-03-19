import React, {useEffect, useState} from "react";
import {API_GET_ITEMS_BY_ADMIN, API_UPDATE_ALL_STATUS, API_URL} from "../../constants";
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
import SubmitContent from "../../Button/SubmitContent/SubmitContent";
import StatusUpdateModal from "../../Button/StatusUpdateModal/StatusUpdateModal";
import StatusBadge from "../../Button/StatusInfo/StatusBadge";
import InfoModal from "../../Button/InfoModal/InfoModal";
import FileUploadModal from "../../Button/FileUploadModal/FileUploadModal";

function ManagerAdmin() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [checkedItems, setCheckedItems] = useState(new Set()); // Lưu ID các dòng được chọn
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20); // default theo backend
    const [totalItems, setTotalItems] = useState(0);
    const [modalItemId, setModalItemId] = useState(null); // ID row đang mở modal

    const [showModalUpdateStatus, setShowModalUpdateStatus] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showModalUploadFile, setShowModalUploadFile] = useState(false);
    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, []);

    const fetchData = async (page = 1, limit = pageSize) => {
        setLoading(true);
        setError("");
        try {
            const tokenString = localStorage.getItem("token"); // Lấy token từ localStorage
            if (!tokenString) return null; // Nếu không có token, trả về null
            const url = `${API_URL}${API_GET_ITEMS_BY_ADMIN}?page=${page}&limit=${limit}`;
            const response = await fetch(url,{
                headers: {
                    Authorization: `Bearer ${tokenString}`
                }
            });
            if (!response.ok) throw new Error("Lỗi khi gọi API");
            const result = await response.json();
            setResults(result.data || []);
            setCurrentPage(result.paging.page || 1);
            setPageSize(result.paging.limit || 20);
            setTotalItems(result.paging.total || 0);
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

    // Logic update content
    const [showModal, setShowModal] = useState(false);


    //Xoá request
    const handleDelete = async  (id) => {
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

    const handleStatusUpdated = async () => {
        await fetchData(); // Load lại danh sách sau khi cập nhật
        console.log('Status updated!');
    };

    const handleSuccessUpdate = () => {
        fetchData(currentPage, pageSize); // Reload data sau khi cập nhật thành công
    };

    const handleOpenModal = (id) => {
        setSelectedId(id);
        setModalShow(true);
    };

    const handleCloseModal = () => {
        setModalShow(false);
        setSelectedId(null);
    };

    const handleOpenUploadFile = () => setShowModalUploadFile(true);
    const handleCloseUploadFile = () => setShowModalUploadFile(false);

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
                                        {/*<span className={`badge ${item.status === 1 ? 'bg-success' : 'bg-primary'}`}>*/}
                                        {/*   {item.status === 1 ? "✅ Hoàn thành" : item.status === 2 ? "🔄 Đang xử lý" : "❓ Không xác định"}*/}
                                        {/*</span>*/}
                                    <StatusBadge status={item.status} />
                                </td>
                                <td  style={{ paddingRight: "50px" }}>
                                    {item.content}
                                </td>
                                <td className="d-flex gap-2 flex-wrap">

                                    <OverlayTrigger placement="top" overlay={renderTooltip("Điền thông tin")}>
                                        <Button variant="info" size="sm" onClick={() => { setModalItemId(item.id); setShowModal(true); }}>📝</Button>
                                    </OverlayTrigger>{ ' ' }

                                    <OverlayTrigger placement="top" overlay={renderTooltip("Thay đổi trạng thái")}>
                                        <Button variant="secondary" size="sm" onClick={() =>{setModalItemId(item.id); setShowModalUpdateStatus(true);}}>🔄</Button>
                                    </OverlayTrigger>{ ' ' }

                                    <OverlayTrigger placement="top" overlay={renderTooltip("Xóa request có ID")}>
                                        <Button variant="danger" size="sm" onClick={()=> handleDelete(item.id)}>🗑</Button>
                                    </OverlayTrigger>{ ' ' }

                                    <OverlayTrigger placement="top" overlay={renderTooltip("Hiển thị thông tin")}>
                                        <Button variant="primary" size="sm" onClick={() => handleOpenModal(item.id)}>🔍</Button>
                                    </OverlayTrigger>{ ' ' }

                                    <OverlayTrigger overlay={renderTooltip("Upload file")}  container={document.body}>
                                        <Button variant="warning" size="sm" onClick={() => handleOpenUploadFile()}>📤</Button>
                                    </OverlayTrigger>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )
            )}

            {/* Modal Form */}
            <SubmitContent show={showModal} handleClose={() => setShowModal(false)} id={modalItemId} status={1} />

            <StatusUpdateModal
                show={showModalUpdateStatus}
                onHide={() => setShowModalUpdateStatus(false)}
                animation={false}
                onStatusUpdated={handleStatusUpdated}
                idUpdate={modalItemId}
                onSuccessUpdate={handleSuccessUpdate}
            />

            <InfoModal
                show={modalShow}
                handleClose={handleCloseModal}
                id={selectedId}
            />

            <FileUploadModal show={showModalUploadFile} handleClose={handleCloseUploadFile} />

            {/* Pagination & Limit control */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                {/* Chọn limit */}
                <div className="d-flex align-items-center">
                    <span className="me-2">Hiển thị:</span>
                    <Form.Select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            fetchData(1, Number(e.target.value));
                        }}
                        style={{ width: "100px" }}
                        className="rounded-pill border-primary"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </Form.Select>
                    <span className="ms-2">dòng/trang</span>
                </div>

                {/* Pagination */}
                <div>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => fetchData(currentPage - 1, pageSize)}
                        className="me-2 rounded-pill"
                    >
                        ◀️ Trước
                    </Button>

                    <span className="fw-semibold">Trang {currentPage}</span>

                    <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={currentPage * pageSize >= totalItems}
                        onClick={() => fetchData(currentPage + 1, pageSize)}
                        className="ms-2 rounded-pill"
                    >
                        Sau ▶️
                    </Button>
                </div>
            </div>

            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Xóa đã chọn!</Tooltip>}>
                <Button
                    variant="danger"
                    onClick={handleShowConfirm} // Hiển thị modal xác nhận
                    disabled={checkedItems.size === 0}
                    className="fw-bold mt-3"
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
