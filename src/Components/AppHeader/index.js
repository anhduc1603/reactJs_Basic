import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";
import { jwtDecode } from "jwt-decode";
import { Navbar, Nav, Badge, Button, Offcanvas, ListGroup, Image, Container, Dropdown } from "react-bootstrap";
import { Bell, Envelope, Cart } from "react-bootstrap-icons";
import { useAuth } from "../Login/AuthContext";
import {useNavigate} from "react-router-dom";
import {FaUser} from "react-icons/fa";


function AppHeader() {
    const [comments, setComments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();


    useEffect(() => {
        getComments().then((res) => setComments(res.comments));
        getOrders().then((res) => setOrders(res.products));
    }, []);

    const getUser = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            const decoded = jwtDecode(token);
            return decoded.username;
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    };

    const logOutAndNavigate = () =>{
        logout();
        navigate("/login");
    }

    const userLogin = getUser();

    return (
        <Navbar bg="light" expand="lg" className="px-3">
            <Container>
                <Navbar.Brand href="#">
                    <Image src="" width={40} className="me-2" />
                    Admin Dashboard
                </Navbar.Brand>
                <Nav className="ms-auto d-flex align-items-center">
                    {/* Icon Mail */}
                    <Nav.Link onClick={() => setShowComments(true)} className="position-relative">
                        <Envelope size={24} />
                        {comments.length > 0 && <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">{comments.length}</Badge>}
                    </Nav.Link>

                    {/* Icon Cart */}
                    <Nav.Link>
                        <Cart size={24} />
                    </Nav.Link>

                    {/* Icon Bell */}
                    <Nav.Link onClick={() => setShowNotifications(true)} className="position-relative">
                        <Bell size={24} />
                        {orders.length > 0 && <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">{orders.length}</Badge>}
                    </Nav.Link>

                    {userLogin && (
                        <Dropdown className="ms-3">
                            <Dropdown.Toggle variant="link" className="text-primary fw-bold">
                                <FaUser size={24} />
                                {userLogin}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={logOutAndNavigate} className="text-danger">
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}

                </Nav>
            </Container>

            {/* Offcanvas Comments */}
            <Offcanvas show={showComments} onHide={() => setShowComments(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Comments</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        {comments.map((item, index) => (
                            <ListGroup.Item key={index}>{item.body}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Offcanvas Notifications */}
            <Offcanvas show={showNotifications} onHide={() => setShowNotifications(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Notifications</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        {orders.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <strong>{item.title}</strong> has been ordered!
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </Navbar>
    );
}

export default AppHeader;
