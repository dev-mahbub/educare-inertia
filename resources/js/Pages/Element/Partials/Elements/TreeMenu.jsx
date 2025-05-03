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

const TreeMenu = () => {
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
                            <button type="button"
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
                            </button>
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
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-BookBookmark"></i>
                        Tree Menu Style
                    </h5>
                </div>
                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <div className="educare-shelf-menu">
                                <ul className="educare-shelf">
                                    {menuData.map((menuItem, index) => (
                                        <li
                                            key={index}
                                            className={
                                                menuItem === activeItem ? "active-element" : ""
                                            }
                                        >
                                            <button type="button"
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
                                            </button>
                                            {openItems.includes(menuItem) &&
                                                renderSubMenu(menuItem.subItems, false)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreeMenu;
