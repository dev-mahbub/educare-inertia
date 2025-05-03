import React, { useState } from "react";

// Example data structure
const menuData = [
    {
        label: "Item 1",
        subItems: [
            {
                label: "Subitem 1.1",
                subItems: [
                    {
                        label: "Subitem 1.1.1",
                        subItems: [
                            {
                                label: "Subitem 1.1.1",
                                subItems: [
                                    { label: "Subitem 1.1.1" },
                                    { label: "Subitem 1.1.2" },
                                    { label: "Subitem 1.1.3" },
                                ],
                            },
                            { label: "Subitem 1.1.2" },
                            { label: "Subitem 1.1.3" },
                        ],
                    },
                    { label: "Subitem 1.1.2" },
                    { label: "Subitem 1.1.3" },
                ],
            },
            { label: "Subitem 1.2" },
            { label: "Subitem 1.3" },
        ],
    },
    {
        label: "Item 2",
        subItems: [
            { label: "Subitem 2.1" },
            { label: "Subitem 2.2" },
            { label: "Subitem 2.3" },
        ],
    },
];

const Dummy = () => {
    const [openItems, setOpenItems] = useState([]);
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (item, isParent) => {
        // Toggle the item's open/closed state
        const isOpen = openItems.includes(item);
        const updatedOpenItems = isOpen
            ? openItems.filter((openItem) => openItem !== item)
            : [...openItems, item];

        setOpenItems(updatedOpenItems);
        setActiveItem(item);
    };

    const renderSubMenu = (subItems, isParent) => {
        if (subItems && subItems.length > 0) {
            return (
                <ul>
                    {subItems.map((subItem, index) => (
                        <li key={index}>
                            <a
                                href="#"
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
                                {subItem.subItems && (
                                    <>
                                        {openItems.includes(subItem) ? (
                                            <span className="icon-MinusCircle"></span>
                                        ) : (
                                            <span className="icon-PlusCircle"></span>
                                        )}
                                    </>
                                )}
                                {subItem.label}
                            </a>
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
        <div className="educare-shelf-menu">
            <ul className="educare-shelf">
                {menuData.map((menuItem, index) => (
                    <li
                        key={index}
                        className={
                            menuItem === activeItem ? "active-element" : ""
                        }
                    >
                        <a
                            href="#"
                            className={`${menuItem === activeItem ? "active-element" : ""
                                } ${menuItem.subItems ? "shelf-single-active" : ""}`}
                            onClick={() => handleItemClick(menuItem, false)}
                        >
                            {menuItem.subItems && (
                                <>
                                    {openItems.includes(menuItem) ? (
                                        <span className="icon-MinusCircle"></span>
                                    ) : (
                                        <span className="icon-PlusCircle"></span>
                                    )}
                                </>
                            )}
                            {menuItem.label}
                        </a>
                        {openItems.includes(menuItem) &&
                            renderSubMenu(menuItem.subItems, false)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dummy;
