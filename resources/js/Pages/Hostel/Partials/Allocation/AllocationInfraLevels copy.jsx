import React, { useState } from "react";

// Example data structure
const menuData = [
    {
        label: "Hostel",
        subItems: [
            {
                id: 1,
                label: "Flore 1",
                description: "Hostel",
                subItems: [
                    {
                        id: 1,
                        label: "Room 1 - 5 Available",
                        description: "Ac",
                        beds: [
                            { id: 1, label: "B1", description: "B1", status: "Available" },
                            {
                                id: 2,
                                label: "B2",
                                roomType: "Ac",
                                status: "Not Available",
                                studentName: "Krunal",
                                class: "IX",
                                fatherName: "Rishu Singh",
                                mobile: "76875635467"
                            },
                            { id: 3, label: "B3", roomType: "Ac", status: "Available" },
                            { id: 4, label: "B4", roomType: "Ac", status: "Available" },
                            { id: 5, label: "B5", roomType: "Ac", status: "Available" }
                        ]
                    },
                    {
                        id: 2,
                        label: "Level 1"
                    },
                    {
                        id: 3,
                        label: "Room 2 - 4 Available",
                        description: "Non-Ac",
                        beds: [
                            { id: 1, label: "B1", roomType: "Non-Ac", status: "Available" },
                            { id: 2, label: "B2", roomType: "Non-Ac", status: "Available" },
                            { id: 3, label: "B3", roomType: "Non-Ac", status: "Available" },
                            { id: 4, label: "B4", roomType: "Non-Ac", status: "Available" },
                        ]
                    },
                    {
                        id: 4,
                        label: "Room 3 - 2 Available",
                        description: "Attached",
                        beds: [
                            { id: 1, label: "B1", roomType: "Attached", status: "Available" },
                            { id: 2, label: "B2", roomType: "Attached", status: "Available" },
                        ]
                    },
                ]
            }
        ]
    }
];

const AllocationInfraLevels = ({ selectedItem, setSelectedItem }) => {

    const handleItemClick = (item, parentItem) => {
        // Update state based on the clicked item
        setSelectedItem({
            label: item.label,
            subItems: item.subItems || null,
            beds: item.beds || null,
        });
    };

    const renderSubMenu = (subItems, parentItem) => {
        if (subItems && subItems.length > 0) {
            return (
                <ul>
                    {subItems.map((subItem, index) => (
                        <li key={index}>
                            <button
                                type="button"
                                className={`${subItem.label === (selectedItem && selectedItem.label) ? "active-element" : ""} ${subItem.subItems ? "shelf-single-active" : ""}`}
                                onClick={() => handleItemClick(subItem, parentItem)}
                            >
                                {subItem.label}
                            </button>
                            {renderSubMenu(subItem.subItems, subItem)}
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    };

    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] pl-3.5 maxXs:pl-0 maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-wrap-border">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <div className="educare-shelf-menu">
                                <ul className="educare-shelf">
                                    {menuData.map((menuItem, index) => (
                                        <li
                                            key={index}
                                            className={menuItem.subItems && menuItem.label === (selectedItem && selectedItem.label) ? "active-element" : ""}
                                        >
                                            <button
                                                type="button"
                                                className={`${menuItem.subItems ? "shelf-single-active" : ""} ${menuItem.label === (selectedItem && selectedItem.label) ? "active-element" : ""}`}
                                                onClick={() => handleItemClick(menuItem)}
                                            >
                                                {menuItem.label}
                                            </button>
                                            {renderSubMenu(menuItem.subItems, menuItem)}
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

export default AllocationInfraLevels;
