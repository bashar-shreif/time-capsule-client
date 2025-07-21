import { House, CircleEllipsis, Map, CircleUser } from "lucide-react";
import Icon from "../../../assets/icons/svgs/Icon.svg";
// import "./style.css";

const SideBar = () => {
    return (
        <>
            <div className="sidebar flex flex-col h-full justify-between">
                <div className="sidebar-icon">
                    <img src={Icon} alt="capsulock" />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="sidebar-nav-item">
                        <House size={32} strokeWidth={1} />
                    </div>
                    <div className="sidebar-nav-item">
                        <Map size={32} strokeWidth={1} />
                    </div>
                    <div className="sidebar-nav-item">
                        <CircleEllipsis size={32} strokeWidth={1} />
                    </div>
                    <div className="sidebar-nav-item">
                        <CircleUser size={32} strokeWidth={1} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;