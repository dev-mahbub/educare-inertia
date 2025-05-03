import { Link } from "@inertiajs/react";
import React, { useState } from "react";

// Example data structure
const menuData = [
    {
        label: "Salary Masters",
        subItems: [
            { label: "Payment Month", navsUrl: "/salary/paymentmonth" },
            { label: "Earnings", navsUrl: "/salary/earning" },
            { label: "Deductions", navsUrl: "/salary/deduction" },
            { label: "Pay Scale", navsUrl: "/salary/payscale" },
            { label: "Staff Earning/Deduction", navsUrl: "/salary/teacherearning" },
            { label: "Import Earning/Deduction", navsUrl: "/salary/importstaffearnings" },
            { label: "Increment", navsUrl: "/salary/incrementstaffsalary" },
            { label: "Salary Setting", navsUrl: "/salary/setting" },
        ],
    },
    {
        label: "Process Salary",
        subItems: [
            { label: "Process Draft Salary", navsUrl: "/salary/process" },
            { label: "Bulk - Process Draft Salary", navsUrl: "/salary/bulkprocess" },
            { label: "Publish Salary", navsUrl: "/salary/publish" },
        ],
    },
    {
        label: "Salary Report",
        subItems: [
            { label: "Bank Statement", navsUrl: "/salary/report/bankstatement" },
            { label: "Yearly Bank Statement", navsUrl: "/salary/report/yearlystatement" },
            { label: "Cancelled Statement", navsUrl: "/salary/report/cancelledreport" },
            { label: "EPF Calculator", navsUrl: "/salary/report/epf" },
            { label: "EPF/EPF Wages Report", navsUrl: "/salary/report/epf-wage" },
            { label: "ESI Calculator", navsUrl: "/salary/report/esi" },
            { label: "Advance Payment Report", navsUrl: "/salary/report/advance-payment" },
            { label: "Basic Salary Report", navsUrl: "/salary/report/basic-salary" },
            { label: "Payment Report", navsUrl: "/salary/report/payment" },
        ],
    },
    { label: "Print Salary Slip", navsUrl: "/salary/print-salary-slip" },
    { label: "Extra/Advance Payment", navsUrl: "/salary/advance-payment" },
];

const SalaryMobileNavs = ({ isMobileNavsShow, onRemoveMobileNavs }) => {
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

export default SalaryMobileNavs;
