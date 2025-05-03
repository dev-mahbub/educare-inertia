import { Link } from "@inertiajs/react";
import React, { useState } from "react";

// Example data structure
const menuData = [

    {
        label: "Stock master",
        subItems: [
            { label: "Stock group", navsUrl: route('category.product_list') },
            { label: "Sale group", navsUrl: route('sale_group.list') },
            { label: "Add single product", navsUrl: route('create_single_product.list') },
            { label: "Add multi product", navsUrl: route('create_multiple_product.list') },
            { label: "Set opening stock", navsUrl: route('opening_stock_product.list') },
            { label: "Set sale price", navsUrl: route('set_sale_price.create_list') },
            { label: "Unit of measurement", navsUrl: route('uom.list') },
            { label: "Infra level", navsUrl: route('infra_level.create_list') },
            { label: "Production", navsUrl: route('product_production.list') },
            { label: "Consumption", navsUrl: route('product_consumption.list') },
            { label: "Add vendor", navsUrl: route('product_vendor.list') },
            { label: "Import item", navsUrl: route('import_item.create_list') },
        ],
    },
    {
        label: "Account Master",
        subItems: [
            { label: "Stock group", navsUrl: route('account_group.list') },
            { label: "Voucher type", navsUrl: route('product_voucher_type.list') },
            { label: "Add ledger", navsUrl: route('ledger.list') },
            { label: "Make All Students/Teachers As Ledger", navsUrl: route('student_teacher_ledger.list') },
            { label: "Ledger search", navsUrl: route('ledger_search.list') },
            { label: "Add company", navsUrl: route('company.list') },
            { label: "Account setting", navsUrl: route('account_setting_show') },
        ],
    },
    {
        label: "Transaction",
        subItems: [
            { label: "Purchase", navsUrl: route('product_purchase.list') },
            { label: "Sale for student", navsUrl: route('student_sale.create') },
            { label: "Sale for teacher", navsUrl: route('teacher_sale.create') },
            { label: "Sale return for student", navsUrl: route('student_sale_return.create') },
            { label: "Sale return for teacher", navsUrl: route('teacher_sale_return.create') },
            { label: "Payment", navsUrl: route('ledger_payment') },
            { label: "Receipt", navsUrl: route('ledger_receipt') },
            { label: "Sale due payment", navsUrl: route('sale_due_payment') },
            { label: "Bulk wallet deduction", navsUrl: route('bulk_wallet.list') },
        ],
    },
    {
        label: "Account Report",
        subItems: [
            { label: "Payment report", navsUrl: route('ledger_payment_report.list') },
            { label: "Receipt report", navsUrl: route('ledger_receipt_report.list') },
            { label: "Ledger report", navsUrl: route('ledger_report.list') },
            { label: "Head wise Payment/Receipt Report", navsUrl: route('date_wise_payment_receipt.list') },
            { label: "Day book", navsUrl: route('day_book_report.list') },
            { label: "Group summary", navsUrl: route('group_summary_report.list') },
            { label: "Payment/Receipt Cancelled Report", navsUrl: route('cancelled_payment_receipt.list') },
            { label: "Trial balance", navsUrl: route('trial_balance_report.list') },
            { label: "Cash book", navsUrl: route('cash_book_report.list') },
        ],
    },
    {
        label: "Inventory Report",
        subItems: [
            { label: "Purchase register", navsUrl: route('purchase_report.list') },
            { label: "Purchase summary", navsUrl: route('purchase_summary_report.list') },
            { label: "Sale register", navsUrl: route('sale_register_report.list') },
            { label: "Sale return register", navsUrl: route('sale_return_report.list') },
            { label: "Sale Summary", navsUrl: route('sale_summary_report.list') },
            { label: "Product report", navsUrl: route('product_report.list') },
            { label: "Product transaction report", navsUrl: route('product_transaction_report.list') },
            { label: "Product wise sale Report", navsUrl: route('product_sale_report.list') },
            { label: "Party wise Sale Report", navsUrl: route('party_sale_report.list') },
            { label: "Sale Due/Paid Report", navsUrl: route('due_paid_report.list') },
            { label: "Consolidated sale report", navsUrl: route('consolidated_sale_report.list') },
        ],
    },
    {
        label: "Inventory Allocation",
        subItems: [
            { label: "Product allocation", navsUrl: route('product_staff_allocation.create') },
            { label: "Allocation summary", navsUrl: route('allocation_summary.list') },
            { label: "Allocation wise report", navsUrl: route('allocation_report.list') },
            { label: "Issued product return", navsUrl: route('product_return.list') },
            { label: "Product return report", navsUrl: route('product_return_report.list') },
        ],
    },
    {
        label: "Asset Allocation",
        subItems: [
            { label: "Allocate product to location", navsUrl: route('allocate_product_location.list') },
            { label: "Product location report", navsUrl: route('allocate_product_location_report.list') },
            { label: "Location Wise Product List", navsUrl: route('location_product.list') },
        ],
    },
];

const InventoryMobileNavs = ({ isMobileNavsShow, onRemoveMobileNavs }) => {
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

export default InventoryMobileNavs;
