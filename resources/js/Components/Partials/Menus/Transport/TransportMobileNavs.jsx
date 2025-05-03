import { Link } from "@inertiajs/react";
import React, { useState } from "react";

// Example data structure
const menuData = [


    {
        label: "Master",
        subItems: [
            { label: "Area", navsUrl: route('area.list') },
            { label: "Vehicle", navsUrl: route('vehicle.list') },
            { label: "Vehicle Staff", navsUrl: route('vehicle_staff.list') },
        ],
    },
    {
        label: "Allocation",
        subItems: [
            { label: "Transport Allocation", navsUrl: route('transport.allocation') },
            { label: "Bulk Transport Allocation", navsUrl: route('transport.allocation_bulk') },
        ],
    },
    {
        label: "Route Management",
        subItems: [
            { label: "Routes", navsUrl: route('transport_route.list') },
            { label: "Stoppage List", navsUrl: route('transport_stoppage.list') },
            { label: "Add New Stoppage", navsUrl: route('transport_stoppage.create') },
        ],
    },
    {
        label: "Report",
        subItems: [
            { label: "Route Summary", navsUrl: route('transport_report.route_summary') },
            { label: "Stoppage Summary", navsUrl: route('transport_report.stoppage_summary') },
            { label: "Area Wise Summary", navsUrl: route('transport_report.areawise_summary') },
            { label: "Route Stoppages", navsUrl: route('transport_report.route_stoppages') },
            { label: "Vehicle Report", navsUrl: route('transport_report.vehiclewise_report') },
            { label: "Class Wise Report", navsUrl: route('transport_report.classwise_report') },
            { label: "Student Payment Report", navsUrl: route('transport_report.student_payment_details') },
            { label: "Teacher Transport Report", navsUrl: route('transport_report.teacher_transport_report') },
            { label: "Driver's Log Book", navsUrl: route('transport_report.drivers_log_book') },
            { label: "Driver's Log Report", navsUrl: route('transport_report.driver_log_book_report') },
            { label: "Update Transport Fee", navsUrl: route('transport_report.update_transport_fee') },
            { label: "Vehicle Summary", navsUrl: route('transport_report.vehicle_summary') },
            { label: "Route Wise Due", navsUrl: route('transport_report.routewise_due_report') },
        ],
    },
    {
        label: "Setting",
        subItems: [
            { label: "Transport Fee Setting", navsUrl: route('transport.fee_setting') },
            { label: "Transport Voucher Due", navsUrl: route('transport.voucher_setting') },
        ],
    },
    { label: "Track Bus", navsUrl: route('transport_report.track_your_vehicle') },
];

const TransportMobileNavs = ({ isMobileNavsShow, onRemoveMobileNavs }) => {
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

export default TransportMobileNavs;
