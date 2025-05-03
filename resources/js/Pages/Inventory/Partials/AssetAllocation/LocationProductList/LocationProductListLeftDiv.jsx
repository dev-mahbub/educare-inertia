import { router } from "@inertiajs/react";
import { useState } from "react";

const LocationProductListLeftDiv = ({
    infraLevels,
    setSelectedInfraLevel,
    data
}) => {

    const [infraLevelIds, setInfraLevelIds] = useState([]);
    const [selectedInfraLevelId, setSelectedInfraLevelId] = useState(null);

    const handleItemClick = (item) => {
        // Toggle the item's open/closed state
        const isOpen = infraLevelIds.includes(item?.id);
        const updatedInfraLevelIds = isOpen
            ? infraLevelIds.filter((id) => id !== item?.id)
            : [...infraLevelIds, item?.id];

        setInfraLevelIds(updatedInfraLevelIds);
        setSelectedInfraLevelId(item?.id);
        setSelectedInfraLevel(item);

        const form_data = {
            infra_level_id: item.id,
            search: data?.search,
            status: data?.status,
        }

        router.post(route('location_product.list'), form_data);
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
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Location Wise Item List
                </h5>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>Infra Levels</h5>
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
        </div>
    );
};

export default LocationProductListLeftDiv;
