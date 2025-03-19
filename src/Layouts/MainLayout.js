import React from "react";
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import "./MainLayout.css";
import AppHeader from "../Components/AppHeader";
import AppFooter from "../Components/AppFooter";
import SideMenu from "../Components/SideMenu";


function MainLayout() {
    return (
        <div className="main-layout">
            {/* Header */}
            <AppHeader />
            {/* Content + Side Menu */}
            <div className="main-content">
                <div className="side-menu">
                    <SideMenu />
                </div>
                <div className="content">
                    <Container fluid>
                        <Outlet />
                    </Container>
                </div>
            </div>

            {/* Footer */}
            <AppFooter />
        </div>
    );
}

export default MainLayout;
