import {Route, Routes} from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import Search from "../../Pages/Search";
import HistoryRequest from "../../Pages/HistoryRequest";
import Register from "../Register/Register";
import ManagerAdmin from "../../Pages/ManagerAdmin";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/history-request" element={<HistoryRequest />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/manager-admin" element={<ManagerAdmin />}></Route>
    </Routes>
  );
}
export default AppRoutes;
