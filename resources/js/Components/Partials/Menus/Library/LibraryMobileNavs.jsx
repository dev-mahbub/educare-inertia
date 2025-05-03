import { Link } from "@inertiajs/react";
import React, { useState } from "react";

// Example data structure
const menuData = [


    {
        label: "Master",
        subItems: [
            { label: "Shelf Level", navsUrl: route('library_shelf_level.shelf_level') },
            { label: "Book Categories", navsUrl: '#' },
            { label: "Library Vendors", navsUrl: route('library_vendor.list') },
            { label: "Library Setting", navsUrl: route('library.setting') },
        ],
    },
    {
        label: "Purchase",
        subItems: [
            { label: "New Purchase", navsUrl: route('book.purchase') },
            { label: "Add InHouse Book", navsUrl: route('book.inhouse') },
            { label: "Purchase History", navsUrl: route('book.purchase_history') },
        ],
    },
    {
        label: "Books",
        subItems: [
            { label: "Master Book List", navsUrl: route('book.list') },
            { label: "Total Book List", navsUrl: route('book.total_book_list') },
            { label: "Book Search By Location", navsUrl: route('book.book_search_by_location') },
            { label: "Allocate Book To Location", navsUrl: route('book.allocate_book_to_location') },
            { label: "InActive Book", navsUrl: route('book.inactive') },
            { label: "Import Book", navsUrl: route('book.import') },
        ],
    },
    {
        label: "Issue / Return",
        subItems: [
            { label: "Issue Book", navsUrl: route('book.issue') },
            { label: "Return Book", navsUrl: route('book.return') },
            { label: "Multiple book Issue/Return", navsUrl: route('book.multi_issues') },
        ],
    },
    {
        label: "E-Book",
        subItems: [
            { label: "Add E-Book", navsUrl: route('ebook.create') },
            { label: "E-Book List", navsUrl: route('ebook.list') },
        ],
    },
    {
        label: "Student Reports",
        subItems: [
            { label: "Issued Book", navsUrl: route('book_report.student_issue_book') },
            { label: "Student Wise Book", navsUrl: route('book_report.student_wise_book') },
            { label: "Student Book Transaction", navsUrl: route('book_report.student_transaction_book') },
            { label: "Student Due Books", navsUrl: route('book_report.student_due_book') },
            { label: "Student Book wise", navsUrl: route('book_report.student_book_wise') },
        ],
    },
    {
        label: "Teacher Reports",
        subItems: [
            { label: "Teacher Issued Book", navsUrl: route('book_report.teacher_issue_book') },
            { label: "Teacher Wise Book", navsUrl: route('book_report.teacher_wise_book') },
            { label: "Teacher Book Transaction", navsUrl: route('book_report.teacher_transaction_book') },
            { label: "Teacher Due Books", navsUrl: route('book_report.teacher_due_book') },
        ],
    },
];

const LibraryMobileNavs = ({ isMobileNavsShow, onRemoveMobileNavs }) => {
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

export default LibraryMobileNavs;
