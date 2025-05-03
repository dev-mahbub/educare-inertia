import { Link } from "@inertiajs/react";
import { useState } from "react";

const TeacherSidebarNavs = ({siteData}) => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const handleMenuClick = (index) => {
        if (activeMenu === index) {
            setActiveMenu(null);
        }
        else {
            setActiveMenu(index);
            setActiveSubMenu(null); // Reset active submenu when clicking a menu item
        }
    };

    const handleSubMenuClick = (subIndex) => {
        if (activeSubMenu === subIndex) {
            setActiveSubMenu(null);
        }
        else {
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
            label: "Help Desk",
            routeLink: route('support_ticket.list'),
            iconClas: "icon-Desktop"
        },
        {
            label: "Classroom",
            routeLink: route('teacher_classroom.index_classroom'),
            iconClas: "icon-Buildings"
        },
        {
            label: "Academic",
            routeLink: route('teacher_academic.index_academic'),
            iconClas: "icon-GraduationCap"
        },
        {
            label: "Manage Students",
            routeLink: route('teacher_dashboard.manage_student_menu'),
            iconClas: "icon-UserList"
        },
        {
            label: "E-Learning",
            routeLink: route('asset.create'),
            iconClas: "icon-ClipboardText"
        },
        {
            label: "Online Exam",
            routeLink: route('online_exam.index'),
            iconClas: "icon-BookBookmark"
        },
        {
            label: "Communication",
            routeLink: route('communication.list'),
            iconClas: "icon-GlobeHemisphereWest"
        }
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
        </ul>
    );
};

export default TeacherSidebarNavs;
