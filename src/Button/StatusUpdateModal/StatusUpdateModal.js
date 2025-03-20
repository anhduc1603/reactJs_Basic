import React, { useState } from 'react';
import {Modal, Button, Form, Alert} from 'react-bootstrap';
import {API_UPDATE} from "../../constants";
import axios from "axios";

function StatusUpdateModal({ show, onHide,idUpdate,onSuccessUpdate }) {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [message, setMessage] = useState('');
    const backendURL = process.env.REACT_APP_API_URL_BACKEND;
    const handleConfirm = async () => {
        if (!selectedStatus) {
            alert('Vui lòng chọn trạng thái!');
            return;
        }

        try {
            const url = `${backendURL}${API_UPDATE}${encodeURIComponent(idUpdate)}`;
            await axios.post(url, {
                status: +selectedStatus
            });
            setMessage('Cập nhật thành công!');
            setTimeout(() => {
                onHide();
                setMessage('');
                onSuccessUpdate(); // Gọi hàm reload data
            }, 1000);
        } catch (error) {
            console.error(error);
            setMessage('Có lỗi xảy ra!');
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật trạng thái</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message && <Alert variant="info">{message}</Alert>}
                <Form>
                    <Form.Group controlId="statusSelect">
                        <Form.Label>Chọn trạng thái</Form.Label>
                        <Form.Select
                            value={selectedStatus}
                            onChange={(e) => {
                                setSelectedStatus(e.target.value)
                                setMessage('');
                            }
                            }>
                            <option value="">-- Chọn trạng thái --</option>
                            <option value="1">Hoàn thành</option>
                            <option value="2">Đang xử lý</option>
                            <option value="3">User đã bấm vào nút "hiển thị dữ liệu"</option>
                            <option value="4">User đã bấm vào nút "download"</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Huỷ
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StatusUpdateModal;
