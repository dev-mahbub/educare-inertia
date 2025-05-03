import { Link } from "@inertiajs/react";
import React, { useState } from "react";

// Example data structure
const menuData = [

    { label: "Take Attendance", navsUrl: route('classroom_attendance.take_attendance') },
    { label: "Today Attendance", navsUrl: route('classroom_attendance_report.today_attendance') },
    { label: "Register View", navsUrl: route('classroom_attendance_report.register_view') },

    {
        label: "Reports",
        subItems: [
            { label: "Absent Report", navsUrl: route('classroom_attendance_report.absent_report') },
            { label: "Send SMS To All Present Students", navsUrl: route('classroom_attendance_report.sendsms_present_students') },
            { label: "Month Report", navsUrl: route('classroom_attendance_report.month_report') },
            { label: "Back Date Report", navsUrl: route('classroom_attendance_report.back_date_report') },
            { label: "Student Wise Attendance", navsUrl: route('classroom_attendance_report.studentwise_attendance') },
            { label: "Date Wise Class Attendance Report", navsUrl: route('classroom_attendance_report.datewiseclass_attendance_report') },
            { label: "Class Wise Daily Attendance Report", navsUrl: route('classroom_attendance_report.classwisedaily_attendance_report') },
        ],
    },
    {
        label: "Set Working and Bonus days",
        subItems: [
            { label: "Set class working and bonus day", navsUrl: route('classroom_attendance.set_class_working') },
            { label: "Set Section working and bonus day", navsUrl: route('classroom_attendance.set_section_working') },
            { label: "Set Student working and bonus day", navsUrl: route('classroom_attendance.set_student_working') },
        ],
    },
];

const StudentAttendanceMobileNavs = ({ isMobileNavsShow, onRemoveMobileNavs }) => {
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

export default StudentAttendanceMobileNavs;
