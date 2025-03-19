import React, {useEffect, useState} from 'react';
import {Button, Modal, Spinner} from 'react-bootstrap';
import axios from 'axios';
import {API_GET_DISPLAY_ITEM_BY_ID, API_URL} from "../../constants";

const InfoModal = ({ show, handleClose, id }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show && id) {
            fetchData();
        }
    }, [show, id]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const url = `${API_URL}${API_GET_DISPLAY_ITEM_BY_ID}${encodeURIComponent(id)}`;
            const response = await axios.get(url);
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Item Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" />
                    </div>
                ) : data ? (
                    <>
                        <p><strong>Info:</strong> {data.info}</p>
                        <p><strong>Content:</strong> {data.content}</p>
                        <p><strong>UserName:</strong> {data.username}</p>
                        <p><strong>Email:</strong> {data.email}</p>
                    </>
                ) : (
                    <p>No data found.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InfoModal;
