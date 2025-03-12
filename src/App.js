import "./App.css";
import SideMenu from "./Components/SideMenu";
import Dashboard from "./Pages/Dashbaord";
import Login from "./Components/Login/Login";
import {Route, Routes} from "react-router-dom";
import {AuthProvider} from "./Components/Login/AuthContext";
import AdminRoute from "./Components/Login/AdminRoute";
import AdminPanel from "./Components/Admin/AdminPanel";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import AppFooter from "./Components/AppFooter";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
      <AppFooter />
    </div>
    //   <HistoryRequest/>
      // <Search/>


      // <AuthProvider>
      //         <SideMenu />
      //         <Routes>
      //             <Route path="/dashboard" element={<Dashboard />} />
      //             <Route path="/login" element={<Login />} />
      //             <Route path="/admin" element={
      //                 <AdminRoute>
      //                     <AdminPanel />
      //                 </AdminRoute>
      //             } />
      //         </Routes>
      // </AuthProvider>
  );
}
export default App;
