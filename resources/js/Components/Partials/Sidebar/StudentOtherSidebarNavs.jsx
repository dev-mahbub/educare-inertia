import { Link } from "@inertiajs/react";
import React, { useState } from "react";

const StudentOtherSidebarNavs = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const handleMenuClick = (index) => {
        if (activeMenu === index) {
            setActiveMenu(null);
        } else {
            setActiveMenu(index);
            setActiveSubMenu(null); // Reset active submenu when clicking a menu item
        }
    };

    const menuData = [
        {
            label: "Edit Profile", 
            routeLink: route('student_profile.edit'), 
            iconClas: "icon-text"
        },
        
    ];
    return (
        <ul className="sidenav-nav">
            {menuData.map((menuItem, index) => (
                <li
                    key={index}
                    className={`sidenav-nav-item ${activeMenu === index ? "active" : ""}`}
                >
                    <Link
                        href={menuItem.routeLink}
                        className="sidenav-nav-link"
                        onClick={() => handleMenuClick(index)}
                    >
                        <i className={menuItem.iconClas}></i>{" "}
                        {menuItem.label}
                        {menuItem.subItems ? (
                            <i className="icon-chevron sidenav-nav-link-icon"></i>
                        ) : null}
                    </Link>
                </li>
            ))}

            <li className={`sidenav-nav-item`}>
                <a
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="sidenav-nav-link">
                    <i className="icon-text"></i>{" "} Log Out
                </a>
            </li>
        </ul>
    );
};

export default StudentOtherSidebarNavs;
