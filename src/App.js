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

function App() {



  return (
    // <div className="App">
    //   <AppHeader />
    //   <div className="SideMenuAndPageContent">
    //     <SideMenu></SideMenu>
    //     <PageContent></PageContent>
    //   </div>
    //   <AppFooter />
    // </div>
    //   <HistoryRequest/>
      // <Search/>


     <div className="App">
         <AuthProvider>
             <Routes>
                 {/* Routes dùng chung Layout */}
                 <Route path="/" element={<MainLayout />}>
                     <Route path="/"  element={<Dashboard />} />
                     <Route path="search" element={<Search />} />
                     <Route path="history-request" element={<HistoryRequest />} />
                     <Route path="register" element={<Register />} />
                     <Route path="manager-admin" element={<ManagerAdmin />} />
                     <Route path="oauth-success" element={<OAuthSuccess />} />
                 </Route>

                 {/* Route riêng không dùng Layout */}
                 <Route path="/login" element={<Login />} />
             </Routes>

         </AuthProvider>
     </div>
  );
}
export default App;
