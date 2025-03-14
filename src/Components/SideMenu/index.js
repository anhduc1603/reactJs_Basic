import { AppstoreOutlined, SearchOutlined, FileSearchOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {getUserRole, useAuth} from "../Login/AuthContext"; // Lấy user từ context
import 'bootstrap/dist/css/bootstrap.css';

function SideMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState("/");

  //Lấy role
  const role = getUserRole();

  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location.pathname]);

  // Danh sách menu cơ bản cho tất cả user
  const menuItems = [
    {
      label: "Dashboard",
      icon: <AppstoreOutlined />,
      key: "/",
    },
    {
      label: "Search",
      key: "/search",
      icon: <SearchOutlined />,
    },
    {
      label: "History Request",
      key: "/history-request",
      icon: <FileSearchOutlined />,
    },
  ];

  // Nếu user có role "admin", thêm menu đặc biệt
  if (role === "admin") {
    menuItems.push(
        {
          label: "Quản trị",
          key: "/manager-admin",
          icon: <UserOutlined />,
        }
    );
  }

  return (
    <>
      {role && (
          <div className="SideMenu">
            <Menu
                mode="vertical"
                onClick={(item) => navigate(item.key)}
                selectedKeys={[selectedKeys]}
                items={menuItems}
            />
          </div>
      )}
    </>
  );
}

export default SideMenu;
