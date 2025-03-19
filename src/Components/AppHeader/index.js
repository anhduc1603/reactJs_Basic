import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import {Container, Dropdown, Image, Nav, Navbar} from "react-bootstrap";
import {useAuth} from "../Login/AuthContext";
import {useNavigate} from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";

function AppHeader() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
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

    const logOutAndNavigate = () => {
        logout();
        navigate("/login");
    };

    const userLogin = getUser();

    return (
        <Navbar bg="light" expand="lg" className="px-3 shadow-sm">
            <Container>
                <Navbar.Brand href="#">
                    <Image src="" width={40} className="me-2" />
                    <strong>Admin Dashboard</strong>
                </Navbar.Brand>

                <Nav className="ms-auto d-flex align-items-center">

                    {userLogin && (
                        <Dropdown align="end" className="ms-3">
                            <Dropdown.Toggle
                                variant="dark"
                                className="d-flex align-items-center rounded-pill px-3 py-2"
                                style={{ backgroundColor: "#000", border: "none" }}
                            >
                                <FaUserCircle size={24} className="me-2" />
                                <span className="fw-bold text-white">{userLogin}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="shadow">
                                <Dropdown.ItemText>
                                    <strong>{userLogin}</strong>
                                </Dropdown.ItemText>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={logOutAndNavigate} className="text-danger">
                                    🔓 Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}

                </Nav>
            </Container>
        </Navbar>
    );
}

export default AppHeader;
