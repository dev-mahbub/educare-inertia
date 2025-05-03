import { Link } from "@inertiajs/react";
import React, { useState } from "react";

const SidebarNavs = ({siteData}) => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const handleMenuClick = (index) => {
        if (activeMenu === index) {
            setActiveMenu(null);
        } else {
            setActiveMenu(index);
            setActiveSubMenu(null); // Reset active submenu when clicking a menu item
        }
    };

    const handleSubMenuClick = (subIndex) => {
        if (activeSubMenu === subIndex) {
            setActiveSubMenu(null);
        } else {
            setActiveSubMenu(subIndex);
        }
    };

    const menuData = [
        {
            label: "Dashboard",
            routeLink: route('dashboard'),
            iconClas: "icon-dashboard"
        },
        {
            label: "Users Management",
            routeLink: route('administrator.list'),
            iconClas: "icon-cap"
        }, 
        {
            label: "Financials",
            routeLink: route('financial.list'), 
            iconClas: "icon-bank"
        },
        {
            label: "Accountancy",
            routeLink: route('inventory.mis_report'), 
            iconClas: "icon-bank"
        },
        {
            label: "Academic Management",
            routeLink: route('academic.list'),
            iconClas: "icon-academic"
        },
        
        {
            label: "Communications",
            routeLink: route('communication.list'),
            iconClas: "icon-bank"
        },
        
        {
            label: "School Settings",
            routeLink: route('school.setupSchool'),
            iconClas: "icon-settting"
        },
        {
            label: "My Profile",
            iconClas: "icon-details",
            routeLink: route('profile.mydetail_salary'),
            icon: "icon-dashboard",
        },
    ];

    const superAdminMenuData = [
        {
            label: "Schools",
            routeLink: route('school.list'),
            iconClas: "icon-settting"
        },
        {
            label: "Certificates",
            routeLink: route('certificate.list'),
            iconClas: "icon-settting"
        },
        {
            label: "Pages",
            routeLink: route('page.list'),
            iconClas: "icon-dashboard"
        },
    ];

    return (
        <ul className="sidenav-nav">
            {menuData.map((menuItem, index) => (
                <li
                    key={index}
                    className={`sidenav-nav-item ${
                        activeMenu === index ? "active" : ""
                    }`}
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
                    {activeMenu === index && menuItem.subItems && (
                        <ul className="sublevel-nav-A">
                            {menuItem.subItems.map((subItem, subIndex) => (
                                <li
                                    key={subIndex}
                                    className={`sublevel-nav-item-A ${
                                        activeSubMenu === subIndex
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <Link
                                        href={subItem.routeLink}
                                        className="sublevel-nav-link"
                                        onClick={() =>
                                            handleSubMenuClick(subIndex)
                                        }
                                    >
                                        {subItem.label}
                                        {menuItem.subItems ? (
                                            <i className="icon-chevron sidenav-nav-link-icon"></i>
                                        ) : null}
                                    </Link>
                                    {activeSubMenu === subIndex &&
                                        subItem.subSubItems && (
                                            <ul className="sublevel-nav-B">
                                                {subItem.subSubItems.map(
                                                    (
                                                        subSubItem,
                                                        subSubIndex
                                                    ) => (
                                                        <li
                                                            key={subSubIndex}
                                                            className="sublevel-nav-item-B"
                                                        >
                                                            <Link
                                                                href={
                                                                    subSubItem.routeLink
                                                                }
                                                                className="sublevel-nav-link"
                                                            >
                                                                {
                                                                    subSubItem.label
                                                                }
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
            
            {siteData.isSuperAdmin && superAdminMenuData.map((menuItem, index) => (
                <li
                    key={index}
                    className={`sidenav-nav-item ${
                        activeMenu === index ? "active" : ""
                    }`}
                >
                    <Link
                        href={menuItem.routeLink}
                        className="sidenav-nav-link"
                        onClick={() => handleMenuClick(index)}
                    >
                        <i className={menuItem.iconClas}></i>{" "}
                        {menuItem.label} {siteData.isSuperAdmin}
                        {menuItem.subItems ? (
                            <i className="icon-chevron sidenav-nav-link-icon"></i>
                        ) : null}
                    </Link>
                    {activeMenu === index && menuItem.subItems && (
                        <ul className="sublevel-nav-A">
                            {menuItem.subItems.map((subItem, subIndex) => (
                                <li
                                    key={subIndex}
                                    className={`sublevel-nav-item-A ${
                                        activeSubMenu === subIndex
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <a
                                        href={subItem.routeLink}
                                        className="sublevel-nav-link"
                                        onClick={() =>
                                            handleSubMenuClick(subIndex)
                                        }
                                    >
                                        {subItem.label}
                                        {menuItem.subItems ? (
                                            <i className="icon-chevron sidenav-nav-link-icon"></i>
                                        ) : null}
                                    </a>
                                    {activeSubMenu === subIndex &&
                                        subItem.subSubItems && (
                                            <ul className="sublevel-nav-B">
                                                {subItem.subSubItems.map(
                                                    (
                                                        subSubItem,
                                                        subSubIndex
                                                    ) => (
                                                        <li
                                                            key={subSubIndex}
                                                            className="sublevel-nav-item-B"
                                                        >
                                                            <a
                                                                href={
                                                                    subSubItem.routeLink
                                                                }
                                                                className="sublevel-nav-link"
                                                            >
                                                                {
                                                                    subSubItem.label
                                                                }
                                                            </a>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
            
        </ul>
    );
};

export default SidebarNavs;
