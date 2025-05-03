import { Link } from "@inertiajs/react";
import React, { useState } from "react";

// Example data structure
const menuData = [

    {
        label: "Fee Masters",
        subItems: [
            { label: "Fee Installments", navsUrl: route('fee.installment') },
            { label: "Fee Category", navsUrl: route('category.fee_create_list') },
            { label: "Fee Type", navsUrl: '/fee/type' },
            { label: "Special Fee Type", navsUrl: '/fee/special-type' },
            { label: "Assign Special Fee Type", navsUrl: '/fee/assign-special-type' },
            { label: "Remove Special Fee Type", navsUrl: '/fee/remove-special-type' },
            { label: "Manage Bank Account", navsUrl: '/bank-accounts' },
            { label: "Create Class Fee Structure", navsUrl: '/fee/create-class-fee-structure' },
            { label: "Update Student Fee Structure", navsUrl: '/fee/update-class-fee-structure' },
            { label: "Assign Fee Group To Students", navsUrl: '/fee/assign-fee-to-student' },
            { label: "Update Student Fee Group", navsUrl: '/fee/update-fee-to-student' },
            { label: "Transfer Fee Due", navsUrl: '/fee/transfer-due-fee' },
            { label: "Fee Setting", navsUrl: '/fee/fee-setting' },
        ],
    },
    {
        label: "Cheque",
        subItems: [
            { label: "Manage Cheques", navsUrl: '/cheque/manage' },
            { label: "Fee PDC", navsUrl: '/cheque/pdc' },
            { label: "Fee All PDC", navsUrl: '/cheque/allpdc' },
            { label: "Bounced Cheque Report", navsUrl: '/cheque/bouncedreport' },
            { label: "Cheque Date Report", navsUrl: '/cheque/chequereport' },
            { label: "Cheque Clearance Report", navsUrl: '/cheque/clearancereport' },
        ],
    },
    { label: "Fee Reports", navsUrl: route('fee_report.dashboard') },
    { label: "Fee Payment", navsUrl: '/fee/installment/payment' },
    {
        label: "Import Fee",
        subItems: [
            { label: "Import", navsUrl: '/fee/import' },
            { label: "Import History", navsUrl: '/fee/import/history' },
            { label: "Import Previous Due", navsUrl: '/fee/import/previousdue' },
        ],
    },
    {
        label: "Concession",
        subItems: [
            { label: "Concession Templete", navsUrl: '/fee/discount' },
            { label: "Set Student Concession", navsUrl: '/fee/discount/student' },
            { label: "Set Bulk Concession ", navsUrl: '/fee/discount/bulk' },
            { label: "Student Availing Concessions ", navsUrl: '/fee/discount/report' },
            { label: "Paid Concession Report ", navsUrl: '/fee/discount/paid-report' },
            { label: "Expected Concession Report ", navsUrl: '/fee/discount/expected-report' },
        ],
    },
    {
        label: "Refund",
        subItems: [
            { label: "Refund Fee", navsUrl: '/fee/refund' },
            { label: "Refund Report", navsUrl: '/fee/refund/report' },
            { label: "Refund Cancel Report ", navsUrl: '/fee/refund/cancel-report' },
            { label: "Adjust Fee ", navsUrl: '/fee/refund/adjust' },
            { label: "Adjust Fee Report ", navsUrl: '/fee/refund/nullify' },
            { label: "Nullify Fee ", navsUrl: '/fee/refund/nullify-report' },
        ],
    },
    {
        label: "Voucher",
        subItems: [
            { label: "Create Voucher", navsUrl: '/fee/voucher/create' },
            { label: "Voucher List", navsUrl: '/fee/vouchers' },
            { label: "Transport Voucher", navsUrl: '/transport/vouchers' },
        ],
    },
    { label: "Bulk Fee Payment", navsUrl: route('fee.bulk_fee_payment') },

];

const FeeMobileNavs = ({ isMobileNavsShow, onRemoveMobileNavs }) => {
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

export default FeeMobileNavs;
