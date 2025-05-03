import { useEffect, useState } from "react";

// Example data structure
const menuData = [
    {
        label: "SCHOOL",
        subItems: [
            {
                label: "First Floor",
                subItems: [
                    {
                        label: "Reception",
                        subItems: [
                            {
                                label: " Af",
                                subItems: [
                                    {
                                        label: "Asd",
                                        subItems: [
                                            { label: "Asd" },
                                            { label: "Dfg" },
                                            { label: "Zxz" },
                                            { label: "Zz" },
                                        ],
                                    }
                                ],
                            },
                            { label: "Z" },
                        ],
                    },
                    { label: "Principal Office" }
                ],
            },
            {
                label: "Second Floor",
                subItems: [
                    { label: "Class Room-1" },
                    { label: "Class Room-2" }
                ]
            },
            { label: "Aa" },
            { label: "Ff" }
        ],
    },
];

const AllocateitemtolocationTreeMenu = ({
    setData,
    infraLevels
}) => {
    // old code. do not remove
    // const [openItems, setOpenItems] = useState([]);
    // const [activeItem, setActiveItem] = useState(null);

    // const handleItemClick = (item, isParent) => {
    //     // Toggle the item's open/closed state
    //     const isOpen = openItems.includes(item);
    //     const updatedOpenItems = isOpen
    //         ? openItems.filter((openItem) => openItem !== item)
    //         : [...openItems, item];

    //     setOpenItems(updatedOpenItems);
    //     setActiveItem(item);
    // };

    const [infraLevelIds, setInfraLevelIds] = useState([]);
    const [selectedInfraLevelId, setSelectedInfraLevelId] = useState(null);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            infra_level_id: selectedInfraLevelId
        }));
    }, [selectedInfraLevelId]);

    const handleItemClick = (item) => {
        // Toggle the item's open/closed state
        const isOpen = infraLevelIds.includes(item?.id);
        const updatedInfraLevelIds = isOpen
            ? infraLevelIds.filter((id) => id !== item?.id)
            : [...infraLevelIds, item?.id];

        setInfraLevelIds(updatedInfraLevelIds);
        setSelectedInfraLevelId(item?.id);
    };

    const renderSubMenu = (subItems, isParent) => {
        if (subItems && subItems.length > 0) {
            return (
                <ul>
                    {subItems.map((subItem, index) => (
                        <li key={index}>
                            <button type="button"
                                className={`${subItem?.id === selectedInfraLevelId
                                    ? "active-element"
                                    : ""
                                    } ${subItem?.id === selectedInfraLevelId && isParent
                                        ? "child-parent"
                                        : ""
                                    } ${subItem?.all_children ? "shelf-single-active" : ""}`}
                                onClick={() =>
                                    handleItemClick(subItem)
                                }
                            >
                                {subItem?.all_children && (
                                    <>
                                        {infraLevelIds.includes(subItem?.id) ? (
                                            <span className="icon-MinusCircle"></span>
                                        ) : (
                                            <span className="icon-PlusCircle"></span>
                                        )}
                                    </>
                                )}
                                {subItem?.name}
                            </button>
                            {infraLevelIds.includes(subItem?.id) &&
                                renderSubMenu(subItem?.all_children, true)}
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
                    <h5> Infra Levels</h5>
                </div>
                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <div className="educare-shelf-menu">
                                <ul className="educare-shelf">
                                    {infraLevels?.length > 0 &&
                                        infraLevels.map((infraLevel, index) => (
                                            <li
                                                key={index}
                                                className={
                                                    infraLevel?.id === selectedInfraLevelId ? "active-element" : ""
                                                }
                                            >
                                                <button type="button"
                                                    className={`${infraLevel?.id === selectedInfraLevelId ? "active-element" : ""
                                                        } ${infraLevel?.all_children ? "shelf-single-active" : ""}`}
                                                    onClick={() => handleItemClick(infraLevel)}
                                                >
                                                    {infraLevel?.all_children && (
                                                        <>
                                                            {infraLevelIds.includes(infraLevel?.id) ? (
                                                                <span className="icon-MinusCircle"></span>
                                                            ) : (
                                                                <span className="icon-PlusCircle"></span>
                                                            )}
                                                        </>
                                                    )}
                                                    {infraLevel?.name}
                                                </button>
                                                {infraLevelIds.includes(infraLevel?.id) &&
                                                    renderSubMenu(infraLevel?.all_children, false)}
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // old code. do not remove
    // const renderSubMenu = (subItems, isParent) => {
    //     if (subItems && subItems.length > 0) {
    //         return (
    //             <ul>
    //                 {subItems.map((subItem, index) => (
    //                     <li key={index}>
    //                         <button type="button"
    //                             className={`${subItem === activeItem
    //                                 ? "active-element"
    //                                 : ""
    //                                 } ${subItem === activeItem && isParent
    //                                     ? "child-parent"
    //                                     : ""
    //                                 } ${subItem.subItems ? "shelf-single-active" : ""}`}
    //                             onClick={() =>
    //                                 handleItemClick(subItem, isParent)
    //                             }
    //                         >
    //                             {subItem.subItems && (
    //                                 <>
    //                                     {openItems.includes(subItem) ? (
    //                                         <span className="icon-MinusCircle"></span>
    //                                     ) : (
    //                                         <span className="icon-PlusCircle"></span>
    //                                     )}
    //                                 </>
    //                             )}
    //                             {subItem.label}
    //                         </button>
    //                         {openItems.includes(subItem) &&
    //                             renderSubMenu(subItem.subItems, true)}
    //                     </li>
    //                 ))}
    //             </ul>
    //         );
    //     }
    //     return null;
    // };

    // return (
    //     <div className="educare-common-card">
    //         <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
    //             <div className="educare-common-card-title">
    //                 <h5> Infra Levels</h5>
    //             </div>
    //             <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
    //                 <div className="grid grid-cols-12 gap-5">
    //                     <div className="col-span-12">
    //                         <div className="educare-shelf-menu">
    //                             <ul className="educare-shelf">
    //                                 {menuData.map((menuItem, index) => (
    //                                     <li
    //                                         key={index}
    //                                         className={
    //                                             menuItem === activeItem ? "active-element" : ""
    //                                         }
    //                                     >
    //                                         <button type="button"
    //                                             className={`${menuItem === activeItem ? "active-element" : ""
    //                                                 } ${menuItem.subItems ? "shelf-single-active" : ""}`}
    //                                             onClick={() => handleItemClick(menuItem, false)}
    //                                         >
    //                                             {menuItem.subItems && (
    //                                                 <>
    //                                                     {openItems.includes(menuItem) ? (
    //                                                         <span className="icon-MinusCircle"></span>
    //                                                     ) : (
    //                                                         <span className="icon-PlusCircle"></span>
    //                                                     )}
    //                                                 </>
    //                                             )}
    //                                             {menuItem.label}
    //                                         </button>
    //                                         {openItems.includes(menuItem) &&
    //                                             renderSubMenu(menuItem.subItems, false)}
    //                                     </li>
    //                                 ))}
    //                             </ul>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default AllocateitemtolocationTreeMenu;
