import { Link } from "@inertiajs/react";
import React, { useState } from "react";

// Example data structure
const menuData = [


    {
        label: "Masters",
        subItems: [
            { label: "Leave Type", navsUrl: route('leave.type') },
            { label: "Leave Allocation", navsUrl: route('leave.allocation') },
            { label: "Leave Approvers", navsUrl: route('leave.approvers') },
            { label: "Staff Leave Setting", navsUrl: route('leave.staff_leave_setting') },
            { label: "Staff Leave Setting Changes History", navsUrl: route('leave.staff_leave_setting_changes_history') },
            { label: "Leave Setting", navsUrl: route('leave.setting') },
            { label: "Leave Setting Changes History", navsUrl: route('leave.setting_changes_history') },
        ],
    },
    { label: "Direct Leave", navsUrl: route('leave.direct') },
    { label: "Request Leave", navsUrl: route('leave.request') },
    { label: "Manage Leave Request", navsUrl: route('leave.manage_leave_request') },
    { label: "Adjust Leave", navsUrl: route('leave.adjust') },
    {
        label: "Report",
        subItems: [
            { label: "Staff OnLeave Today", navsUrl: route('leave_report.staff_onleave_today') },
            { label: "Staff Wise Leave Report", navsUrl: route('leave_report.staff_wise') },
            { label: "Month Wise Leave Report", navsUrl: route('leave_report.month_wise') },
            { label: "Staff Wise Month Leave Report", navsUrl: route('leave_report.staff_wise_month') },
            { label: "Leave Type Wise Month Leave Report", navsUrl: route('leave_report.type_wise_month') },
            { label: "Staff Wise Leave Summary", navsUrl: route('leave_report.staff_wise_summary') },
            { label: "Staff Wise Attendance Report", navsUrl: route('leave_report.staff_wise_attendance') },
            { label: "Month Wise Attendance Report", navsUrl: route('leave_report.month_wise_attendance') },
            { label: "Extra Day Report", navsUrl: route('leave_report.extra_day') },
            { label: "Outdoor Report", navsUrl: route('leave_report.outdoor') },
            { label: "Register View Report", navsUrl: route('leave_report.register_view') },
        ],
    },
];

const LeaveMobileNavs = ({ isMobileNavsShow, onRemoveMobileNavs }) => {
    const [openItems, setOpenItems] = useState([]);
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (item, isParent) => {
        // Toggle the item's open/closed state
        const isOpen = openItems.includes(item);
        const updatedOpenItems = isOpen
            ? openItems.filter((openItem) => openItem !== item)
            : [item];

        setOpenItems(updatedOpenItems);
        setActiveItem(item);

        // Close all other open menus
        const closeOtherMenus = menuData
            .filter((menuItem) => menuItem !== item)
            .flatMap((menuItem) => menuItem.subItems || []);

        setOpenItems((prevOpenItems) => [
            ...prevOpenItems.filter((openItem) => !closeOtherMenus.includes(openItem)),
            ...updatedOpenItems,
        ]);
    };


    const renderSubMenu = (subItems, isParent) => {
        if (subItems && subItems.length > 0) {
            return (
                <ul>
                    {subItems.map((subItem, index) => (
                        <li key={index}>
                            <Link href={subItem.navsUrl}
                                className={`${subItem === activeItem
                                    ? "active-element"
                                    : ""
                                    } ${subItem === activeItem && isParent
                                        ? "child-parent"
                                        : ""
                                    } ${subItem.subItems ? "shelf-single-active" : ""}`}
                                onClick={() =>
                                    handleItemClick(subItem, isParent)
                                }
                            >
                                {subItem.label}
                                {subItem.subItems && (
                                    <>
                                        {openItems.includes(subItem) ? (
                                            <span className="icon-MinusCircle"></span>
                                        ) : (
                                            <span className="icon-PlusCircle"></span>
                                        )}
                                    </>
                                )}
                            </Link>
                            {openItems.includes(subItem) &&
                                renderSubMenu(subItem.subItems, true)}
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    };

    return (
        <>
            <div className={`educare-sidebar-navs ${isMobileNavsShow ? 'active' : ''}`}>
                <ul className="educare-shelf">
                    {menuData.map((menuItem, index) => (
                        <li
                            key={index}
                            className={menuItem === activeItem ? "active-element" : ""}
                        >
                            {menuItem.subItems ? (
                                <button
                                    type="button"
                                    className={`${menuItem === activeItem ? "active-element" : ""
                                        } ${menuItem.subItems ? "shelf-single-active" : ""}`}
                                    onClick={() => handleItemClick(menuItem, false)}
                                >
                                    {menuItem.label}
                                    {menuItem.subItems && (
                                        <>
                                            {openItems.includes(menuItem) ? (
                                                <span className="icon-MinusCircle"></span>
                                            ) : (
                                                <span className="icon-PlusCircle"></span>
                                            )}
                                        </>
                                    )}
                                </button>
                            ) : (
                                <Link href={menuItem.navsUrl} className="shelf-parent-url">
                                    {menuItem.label}
                                </Link>
                            )}
                            {openItems.includes(menuItem) &&
                                renderSubMenu(menuItem.subItems, false)}
                        </li>
                    ))}
                </ul>


                {/* <div className="hidden">
                    <span onClick={onRemoveMobileNavs}>Cancel</span>
                </div> */}
            </div>

            {/* <div className={`educare-sidebar-navs-overlay ${isMobileNavsShow ? 'active' : ''}`} onClick={onRemoveMobileNavs}></div> */}
        </>
    );
};

export default LeaveMobileNavs;
