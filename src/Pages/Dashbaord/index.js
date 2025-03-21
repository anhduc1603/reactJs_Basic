import React, {useEffect, useState} from "react";
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {API_GET_DASHBOARD, API_GET_DASHBOARD_BY_USER_ID} from "../../constants";
import {getUserID, getUserRole} from "../../Components/Login/AuthContext";

const Dashboard = () => {
    const [data, setData] = useState({
        totalRecords: 0,
        completed: 0,
        inProgress: 0,
        displayedData: 0,
        downloaded: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const backendURL = process.env.REACT_APP_API_URL_BACKEND;


    //Lấy role
    const role = getUserRole();
    const userID = getUserID();

    useEffect(() => {
        // Thay URL này bằng API thực tế của bạn
        const apiUrl = role === "admin"
            ? `${backendURL}${API_GET_DASHBOARD}`
            : `${backendURL}${API_GET_DASHBOARD_BY_USER_ID}${encodeURIComponent(userID)}`;

        const fetchData = async () => {
            try {
                const tokenString = localStorage.getItem("token"); // Lấy token từ localStorage
                if (!tokenString) return null; // Nếu không có token, trả về null
                
                const response = await fetch(apiUrl,{
                    headers: {
                    Authorization: `Bearer ${tokenString}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`Lỗi HTTP! Status: ${response.status}`);
                }
                const result = await response.json();
                setData({
                    totalRecords: result.totalRecords,
                    completed: result.completed,
                    inProgress: result.inProgress,
                    displayedData: result.displayedData,
                    downloaded: result.downloaded,
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" variant="primary" />
                <p>Đang tải dữ liệu...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4 text-center">
                <p>Lỗi khi tải dữ liệu: {error}</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col md={3}>
                    <Card className="text-center text-white bg-primary mb-4">
                        <Card.Body>
                            <Card.Title>Tổng số bản ghi</Card.Title>
                            <h2>{data.totalRecords}</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center text-white bg-success mb-4">
                        <Card.Body>
                            <Card.Title>Hoàn thành</Card.Title>
                            <h2>{data.completed}</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center text-white bg-warning mb-4">
                        <Card.Body>
                            <Card.Title>Đang xử lý</Card.Title>
                            <h2>{data.inProgress}</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center text-white bg-info mb-4">
                        <Card.Body>
                            <Card.Title>Đã hiển thị dữ liệu</Card.Title>
                            <h2>{data.displayedData}</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center text-white bg-secondary mb-4">
                        <Card.Body>
                            <Card.Title>Đã tải xuống</Card.Title>
                            <h2>{data.downloaded}</h2>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
