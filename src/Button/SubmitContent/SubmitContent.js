import React, {useState} from 'react';
import {Alert, Button, Form, Modal} from 'react-bootstrap';
import axios from 'axios';
import './SubmitContent.css';
import {API_UPDATE, API_URL, STATUS_SUCCESS} from "../../constants"; // Import file CSS nếu bạn sử dụng file CSS riêng

const SubmitContent = ({ show, handleClose,id, status }) => {
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        try {
            const url = `${API_URL}${API_UPDATE}${encodeURIComponent(id)}`;
            await axios.post(url, {
                content: inputValue ,
                status: STATUS_SUCCESS
            });
            setMessage('Cập nhật thành công!');
            setTimeout(() => {
                handleClose();
                setMessage('');
                setInputValue('');
            }, 1000);
        } catch (error) {
            console.error(error);
            setMessage('Có lỗi xảy ra!');
        }
    };

    const handleClear = () => {
        setInputValue('');
        setMessage('');
    };

    const handleCancel = () => {
        setInputValue('');
        setMessage('');
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleCancel} centered>
            <Modal.Header closeButton className="p-4">
                <Modal.Title style={{ fontSize: '24px' }}>Form Nhập Nội Dung</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                {message && <Alert variant="info">{message}</Alert>}
                <Form>
                    <Form.Group className="mb-3" controlId="formInput">
                        <Form.Label>Nhập nội dung</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập vào đây..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            style={{ padding: '12px', fontSize: '16px' }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-4 d-flex justify-content-between">
                <Button variant="primary" onClick={handleSubmit}>
                    Nhập
                </Button>
                <Button variant="warning" onClick={handleClear}>
                    Clear
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SubmitContent;