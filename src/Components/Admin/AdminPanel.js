import { useState } from "react";
import {useAuth} from "../Login/AuthContext";

function AdminPanel() {
    const { isAuthenticated } = useAuth();

    const checkConsole= ()=>{
        console.log("check isAuthenticated" +isAuthenticated)
    }

    return
    (
        <div>
            {checkConsole()}
            <h1>xin chào admin panel</h1>
        </div>
    );
}

export default AdminPanel;