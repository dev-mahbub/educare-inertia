import React, { useState } from "react";

// Example data structure
const menuData = [
    {
        id: 1,
        label: "LIBRARY",
        subItems: [
            {
                id: 1,
                label: "Almirah-1",
                subItems: [
                    {
                        id: 1,
                        label: "Rack-1",
                    },
                    {
                        id: 2,
                        label: "Rack-2",
                    },
                    {
                        id: 3,
                        label: "Rack-3",
                    },
                ]
            },
            {
                id: 2,
                label: "Almirah-2",
                subItems: [
                    {
                        id: 1,
                        label: "Rack-1",
                    },
                    {
                        id: 2,
                        label: "Rack-2",
                    },
                    {
                        id: 3,
                        label: "Rack-3",
                    },
                ]
            },
            {
                id: 3,
                label: "Room-3",

            },
            {
                id: 4,
                label: "Room-1",
                subItems: [
                    {
                        id: 1,
                        label: "Wall-1",
                        subItems: [
                            {
                                id: 1,
                                label: "Almirah-1",
                            },
                            {
                                id: 2,
                                label: "Almirah-2",
                            },
                        ]
                    },
                    {
                        id: 2,
                        label: "Wall-2",
                    },
                ]
            },
        ]
    }
];

const ShelfLevelInfraLavels = ({ selectedItem, setSelectedItem, getLibrariesData }) => {

    const handleItemClick = (item, parentItem) => {
        // Update state based on the clicked item

        setSelectedItem({
            id: item?.id,
            label: item?.name,
            subItems: item?.child_libraries || null,
            beds: item.beds || null,
        });
    };

    console.log(getLibrariesData);

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
                                {subItem.name}
                            </button>
                            {renderSubMenu(subItem.child_libraries, subItem)}
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    };



    return (
        <>
            <div className="educare-card-title mr-auto mb-5 pb-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Infra Levels
                </h5>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-wrap-border">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12">
                                <div className="educare-shelf-menu">
                                    <ul className="educare-shelf">
                                        {getLibrariesData.map((menuItem, index) => (
                                            <li
                                                key={index}
                                                className={menuItem.subItems && menuItem.label === (selectedItem && selectedItem.label) ? "active-element" : ""}
                                            >
                                                <button
                                                    type="button"
                                                    className={`${menuItem.subItems ? "shelf-single-active" : ""} ${menuItem.label === (selectedItem && selectedItem.label) ? "active-element" : ""}`}
                                                    onClick={() => handleItemClick(menuItem)}
                                                >
                                                    {menuItem.name}
                                                </button>
                                                {renderSubMenu(menuItem.child_libraries, menuItem)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShelfLevelInfraLavels;
