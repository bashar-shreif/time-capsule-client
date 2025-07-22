import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { House, Map, CircleUser } from "lucide-react";
import Icon from "../../assets/icons/svgs/Icon.svg";
import "./style.css";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { icon: House, path: "/home", label: "Home" },
    { icon: Map, path: "/map", label: "Map" },
    { icon: CircleUser, path: "/profile", label: "Profile" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="layout">
      <div className="sidebar flex flex-col h-full justify-between">
        <div className="sidebar-icon">
          <img src={Icon} alt="capsulock" />
        </div>

        <div className="flex flex-col gap-4">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <div
                key={index}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavigation(item.path)}
                title={item.label}
              >
                <IconComponent size={32} strokeWidth={1} />
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout