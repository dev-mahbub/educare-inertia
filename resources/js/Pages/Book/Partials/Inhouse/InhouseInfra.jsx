import React, { useEffect, useState } from "react";

// Example data structure
const menuData = [
    {
        label: "LIBRARY",
        subItems: [
            {
                label: "Almirah-1",
                subItems: [
                    { label: "Rack-1", },
                    { label: "Rack-2" },
                    { label: "Rack-3" },
                ],
            },
            {
                label: "Almirah-2",
                subItems: [
                    { label: "Rack-1", },
                    { label: "Rack-2" },
                    { label: "Rack-3" },
                ],
            },
            {
                label: "Room-3",
            },
            {
                label: "Room-1",
                subItems: [
                    {
                        label: "Wall-1",
                        subItems: [
                            { label: "Almira 1", },
                            { label: "Almira 2" },
                        ],
                    },
                    { label: "Wall-2" },
                ],
            },
        ],
    }
];

//component start
const InhouseInfra = ({ activeItem, setActiveItem, setItems }) => {
    // const [activeItem, setActiveItem] = useState({ almirah: null, rack: null });
    // console.log(activeItem);

    // const [items, setItems]=useState({almirah: null, wall: null, rack: null});
    // console.log(items);

    useEffect(() => {
        let newItems;

        if (activeItem?.almirah === "Wall-1") {
            newItems = { almirah: "Room-1", wall: activeItem.almirah, rack: activeItem.rack };
            setItems(newItems);
        } else (setItems({ almirah: null, wall: null, rack: null }))
    }, [activeItem?.rack]);


    const renderSubMenu = (subItems, parentItem) => {
        if (subItems && subItems.length > 0) {
            return (
                <ul>
                    {subItems.map((subItem, index) => (
                        <li key={index}>
                            <button
                                type="button"
                                className={`${subItem.label === activeItem.rack && parentItem.label === activeItem.almirah ? "active-element" : ""} ${subItem.subItems ? "shelf-single-active" : ""}`}
                                onClick={() => setActiveItem({ almirah: parentItem.label, rack: subItem.label })}
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
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-wrap-border">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <div className="educare-shelf-menu">
                                <ul className="educare-shelf">
                                    {menuData.map((menuItem, index) => (
                                        <li
                                            key={index}
                                            className={menuItem.subItems && menuItem.label === activeItem.almirah && menuItem.label !== "LIBRARY" ? "active-element" : ""}
                                        >
                                            <button
                                                type="button"
                                                className={`${menuItem.subItems ? "shelf-single-active" : ""} ${menuItem.label === activeItem.almirah ? "active-element" : ""}`}
                                                onClick={() => setActiveItem({ almirah: menuItem.label, rack: null })}
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

export default InhouseInfra;
