import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

const AllocationInfraLevels = ({
    infraLevels,
    childLevels,
    infraLavelIds,
    infraLavelIdString,
    currentLavelId,
    is_open,
    type,
}) => {
    const [openItems, setOpenItems] = useState([]);
    const [activeItem, setActiveItem] = useState(currentLavelId);

    const handleItemClick = (item, parentId, currentId, isOpen, infra_level_type) => {
        setActiveItem(currentId)
        // Toggle the item's open/closed state
        let parentString = parentId ? parentId + ',' + currentId : currentId;
        router.get('/hostel/allocation?ids=' + parentString + '&current=' + item.id + '&is_open=' + isOpen + '&type=' + infra_level_type);
    };

    const renderSubMenu = (subItems, isParent) => {
        if (subItems && subItems.length > 0) {
            return (
                <ul>
                    {subItems.map((subItem, index) => (
                        <li key={index}>
                            <a
                                href="#"
                                className={`${subItem.id == activeItem ? "badge primary" : ""}`} // Add this line
                                onClick={() =>
                                    handleItemClick(subItem, infraLavelIdString, currentLavelId, !is_open, subItem?.infra_level_type)
                                }
                            >
                                {/* {subItem.length && (
                                    <>
                                        {openItems.includes(subItem.id) ? (
                                            <span className="icon-MinusCircle"></span>
                                        ) : (
                                            <span className="icon-PlusCircle"></span>
                                        )}
                                    </>
                                )} */}
                                {subItem.name} {subItem?.infra_level_type === 'Room' && `-(${subItem?.available_beds} Avail)`}

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

    useEffect(() => {
        setActiveItem(currentLavelId);
    }, [currentLavelId])

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
                            className={`${currentLavelId == activeItem ? "badge primary" : ""}`}
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
                            {menuItem.name}
                        </a>

                        {infraLavelIds.includes(menuItem?.id.toString()) &&
                            renderSubMenu(childLevels[menuItem.id], false)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllocationInfraLevels;
