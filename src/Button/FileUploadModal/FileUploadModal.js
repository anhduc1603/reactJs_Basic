import React, { useState } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const FileUploadModal = ({ show, handleClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setMessage('');
    };

    const handleUpload = () => {
        if (!selectedFile) {
            setMessage('Please select a file first!');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                setMessage('File uploaded successfully!');
                setLoading(false);
            })
            .catch(error => {
                setMessage('Failed to upload file!');
                setLoading(false);
            });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Upload File</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message && <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>{message}</Alert>}

                <Form>
                    <Form.Group controlId="formFile">
                        <Form.Label>Select File:</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpload} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Upload'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FileUploadModal;
