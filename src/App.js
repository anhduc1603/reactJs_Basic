import "./App.css";
import Dashboard from "./Pages/Dashbaord";
import Login from "./Components/Login/Login";
import {Route, Routes} from "react-router-dom";
import {AuthProvider} from "./Components/Login/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from "./Layouts/MainLayout";
import Search from "./Pages/Search";
import HistoryRequest from "./Pages/HistoryRequest";
import Register from "./Components/Register/Register";
import ManagerAdmin from "./Pages/ManagerAdmin";
import OAuthSuccess from "./Components/Login/OAuthSuccess";
import ProtectedRoute from "./Components/Login/ProtectedRoute";


function App() {



    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    {/* Routes dùng chung Layout */}
                    <Route path="/" element={<MainLayout/>}>
                        <Route path="dashboard" element={
                            <ProtectedRoute>
                                <Dashboard/>
                            </ProtectedRoute>
                        }/>
                        <Route path="search" element={
                            <ProtectedRoute>
                                <Search/>
                            </ProtectedRoute>
                        }/>
                        <Route path="history-request" element={
                            <ProtectedRoute>
                                <HistoryRequest/>
                            </ProtectedRoute>
                        }/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="manager-admin" element={<ManagerAdmin/>}/>
                        <Route path="oauth-success" element={<OAuthSuccess/>}/>
                    </Route>

                    {/* Route riêng không dùng Layout */}
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </AuthProvider>
        </div>


        
    );
}

export default App;
