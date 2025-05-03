import { Link } from "@inertiajs/react";
import React, { useState } from "react";

const ParentSidebarNavs = ({siteData}) => {
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
            label: "Profile",
            routeLink: route('parent_profile.edit'),
            iconClas: "icon-UserCircle"
        },
        {
            label: "My Kids",
            routeLink: route('student_profile.details'),
            iconClas: "icon-UsersFour"
        },
        {
            label: "Message",
            routeLink: route('webmessage.inbox'),
            iconClas: "icon-message"
        },
        {
            label: "Academic",
            routeLink: route('parent_academic.index_academic'),
            iconClas: "icon-academic"
        },
        {
            label: "Online Fee",
            routeLink: route('fee_online_payment.index'),
            iconClas: "icon-bank"
        },
        {
            label: "Online Exam",
            routeLink: route('student_online_exam.index'),
            iconClas: "icon-exam"
        },
        {
            label: "Issue Book",
            routeLink: route('student_issue_book.list'),
            iconClas: "icon-BookBookmark"
        },{
            label: "Survey",
            routeLink: route('student_survey.list'),
            iconClas: "icon-ChartLine"
        },
        {
            label: "Hostel",
            routeLink: route('student_hostel.list'),
            iconClas: "icon-House"
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

export default ParentSidebarNavs;
