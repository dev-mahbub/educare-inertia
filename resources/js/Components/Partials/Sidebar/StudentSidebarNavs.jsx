import { Link } from "@inertiajs/react";
import { useState } from "react";

const StudentSidebarNavs = ({siteData}) => {
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
            label: "Helpdesk / Webinar",
            routeLink: route('support_ticket.list'),
            iconClas: "icon-dashboard"
        },
        {
            label: "My Kids",
            routeLink: route('student_profile.details'),
            iconClas: "icon-academic"
        },
        {
            label: "Message",
            routeLink: route('webmessage.inbox'),
            iconClas: "icon-cap"
        },
        {
            label: "Academic",
            routeLink: route('academic.list'),
            iconClas: "icon-academic"
        },
        {
            label: "Administration",
            routeLink: route('administrator.list'),
            iconClas: "icon-cap"
        },
        {
            label: "Communication",
            routeLink: route('communication.list'),
            iconClas: "icon-bank"
        },
        {
            label: "Financial",
            routeLink: route('fee.mis_report'),
            iconClas: "icon-bank"
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
        </ul>
    );
};

export default StudentSidebarNavs;
