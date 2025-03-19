import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "antd";

function AppFooter() {
    return (
        <footer className="bg-light py-3 border-top mt-4">
            <Container>
                <Row className="text-center">
                    <Col md={12}>
                        <div className="mb-2">
                            <Typography.Link href="tel:+123456789" className="mx-2 text-muted">
                                📞 SĐT: 0333 222 333
                            </Typography.Link>
                            <Typography.Link href="https://www.google.com" target="_blank" className="mx-2 text-muted">
                                Chịu trách nhiệm nội dung
                            </Typography.Link>
                            <Typography.Link href="https://www.google.com" target="_blank" className="mx-2 text-muted">
                                Điều khoản sử dụng
                            </Typography.Link>
                            <Typography.Link href="https://www.google.com" target="_blank" className="mx-2 text-muted">
                                Thông tin liên hệ
                            </Typography.Link>
                        </div>
                        <div className="text-muted small">
                            © {new Date().getFullYear()} Bản quyền thuộc về Công ty ABC
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default AppFooter;
