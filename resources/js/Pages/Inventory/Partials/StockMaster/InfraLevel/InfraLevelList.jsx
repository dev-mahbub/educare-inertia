import { router } from "@inertiajs/react";
import { useState } from "react";

// Example data structure
const menuData = [
    {
        label: "School",
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
    //   {
    //       label: "Item 2",
    //       subItems: [
    //           { label: "Subitem 2.1" },
    //           { label: "Subitem 2.2" },
    //           { label: "Subitem 2.3" },
    //       ],
    //   },
];

const InfraLevelList = ({ infraLevels, childLevels, infraLavelIds, infraLavelIdString, currentLavelId, is_open }) => {
    const [openItems, setOpenItems] = useState([]);
    const [activeItem, setActiveItem] = useState(false);

    const handleItemClick = (item, parentId, currentId, isOpen) => {
        // Toggle the item's open/closed state
        let parentString = parentId ? parentId + ',' + currentId : currentId;
        router.get('/inventory/infra/level?ids=' + parentString + '&current=' + item.id + '&is_open=' + isOpen);
    };

    // useEffect(() => {
    //     setActiveItem(!is_open);
    // }, [is_open]);

    const renderSubMenu = (subItems, isParent) => {
        if (subItems && subItems.length > 0) {
            return (
                <ul>
                    {subItems.map((subItem, index) => (
                        <li key={index}>
                            <a
                                href="#"
                                className={`${subItem.id === activeItem
                                    ? "active-element"
                                    : ""
                                    } ${subItem.id === activeItem && isParent
                                        ? "child-parent"
                                        : ""
                                    } ${subItem.id ? "shelf-single-active" : ""}`}
                                onClick={() =>
                                    handleItemClick(subItem, infraLavelIdString, currentLavelId, !is_open)
                                }
                            >
                                {subItem.length && (
                                    <>
                                        {openItems.includes(subItem.id) ? (
                                            <span className="icon-MinusCircle"></span>
                                        ) : (
                                            <span className="icon-PlusCircle"></span>
                                        )}
                                    </>
                                )}
                                {/* {subItem.label} - {subItem.id} */}
                                {subItem.label}
                            </a>
                            {infraLavelIds.includes(subItem.id.toString()) &&
                                renderSubMenu(childLevels[subItem.id], true)}
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
                {infraLevels.length && infraLevels.map((menuItem, index) => (
                    <li
                        key={index}
                        className={infraLavelIds.includes(menuItem?.id.toString()) ? "active-element" : ""}
                    >
                        <a
                            href="#"
                            className={`${infraLavelIds.includes(menuItem?.id.toString()) ? "active-element" : ""} ${menuItem.id ? "shelf-single-active" : ""}`}
                            onClick={() => handleItemClick(menuItem, infraLavelIdString, currentLavelId, !is_open)}
                        >
                            {childLevels[menuItem.id]?.length && (
                                <>
                                    {infraLavelIds.includes(menuItem?.id.toString()) ? (
                                        <span className="icon-MinusCircle"></span>
                                    ) : (
                                        <span className="icon-PlusCircle"></span>
                                    )}
                                </>
                            )}
                            {menuItem.label}
                        </a>

                        {infraLavelIds.includes(menuItem?.id.toString()) &&
                            renderSubMenu(childLevels[menuItem.id], false)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InfraLevelList;
