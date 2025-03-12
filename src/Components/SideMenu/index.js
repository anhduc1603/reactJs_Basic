import { AppstoreOutlined, SearchOutlined, FileSearchOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Login/AuthContext"; // Lấy user từ context

function SideMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState("/");

  // Lấy thông tin user
  const { user } = useAuth();

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
  if (user?.role === "admin") {
    menuItems.push(
        {
          label: "User Management",
          key: "/users",
          icon: <UserOutlined />,
        },
        {
          label: "Admin Settings",
          key: "/admin-settings",
          icon: <SettingOutlined />,
        }
    );
  }

  return (
      <div className="SideMenu">
        <Menu
            mode="vertical"
            onClick={(item) => navigate(item.key)}
            selectedKeys={[selectedKeys]}
            items={menuItems}
        />
      </div>
  );
}

export default SideMenu;
