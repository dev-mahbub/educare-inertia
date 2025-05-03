import { Link } from "@inertiajs/react";
import React, { useState } from "react";

const OtherSidebarNavs = ({siteData}) => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const handleMenuClick = (index) => {
        setActiveMenu(index);
    };

    const handleSubMenuClick = (subIndex) => {
        if (activeSubMenu === subIndex) {
            setActiveSubMenu(null);
        } else {
            setActiveSubMenu(subIndex);
        }
    };

    const menuData = [
        {
            label: "Buy SMS", 
            routeLink: route('our_service.buy_sms'),
            iconClas: "icon-text"
        },
        {
            label: "Billing",
            routeLink: route('our_service.unpaid_invoice'),
            iconClas: "icon-coin",
        },
        {
            label: "Buy service",
            routeLink: route('our_service.buy_service'),
            iconClas: "icon-buy-service"
        },
    ];
    return (
        <ul className="sidenav-nav"> {/* siteData?.authModules?.module_birthday */}
            {siteData?.authModules?.module_buy_sms &&
            <li className={`sidenav-nav-item ${activeMenu === 'buy_sms' ? "active" : ""}`}>
                <Link
                    href={route('our_service.buy_sms')}
                    className="sidenav-nav-link"
                    onClick={() => handleMenuClick('buy_sms')}
                >
                    <i className="icon-text"></i>{" "}
                    Buy SMS
                </Link>
            </li>
            }
            {siteData?.authModules?.module_billing &&
            <li className={`sidenav-nav-item ${activeMenu === 'unpaid_invoice' ? "active" : ""}`}>
                <Link
                    href={route('our_service.unpaid_invoice')}
                    className="sidenav-nav-link"
                    onClick={() => handleMenuClick('unpaid_invoice')}
                >
                    <i className="icon-coin"></i>{" "}
                    Billing
                </Link>
            </li>
            }
            {siteData?.authModules?.module_buy_services &&
            <li className={`sidenav-nav-item ${activeMenu === 'buy_service' ? "active" : ""}`}>
                <Link
                    href={route('our_service.buy_service')}
                    className="sidenav-nav-link"
                    onClick={() => handleMenuClick('buy_service')}
                >
                    <i className="icon-buy-service"></i>{" "}
                    Buy service
                </Link>
            </li>
            }

            {/* {menuData.map((menuItem, index) => (
            <li
                key={index}
                className={`sidenav-nav-item ${siteData?.authModules?.module_birthday ? '' : 'hidden'} ${activeMenu === index ? "active" : ""}`}
            >
                <Link
                    href={menuItem.routeLink}
                    className="sidenav-nav-link"
                    onClick={() => handleMenuClick(index)}
                >
                    <i className={menuItem.iconClas}></i>{" "}
                    {menuItem.label}
                    {menuItem.subItems ? (
                        <i className="icon-chevron sidenav-nav-link-icon"></i>
                    ) : null}
                </Link>
            </li>
            ))} */}

                    {/* {activeMenu === index && menuItem.subItems && (
                        <ul className="sublevel-nav-A">
                            {menuItem.subItems.map((subItem, subIndex) => (
                                <li
                                    key={subIndex}
                                    className={`sublevel-nav-item-A ${
                                        activeSubMenu === subIndex
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <Link
                                        href={subItem.routeLink}
                                        className="sublevel-nav-link"
                                        onClick={() =>
                                            handleSubMenuClick(subIndex)
                                        }
                                    >
                                        {subItem.label}
                                        {menuItem.subItems ? (
                                            <i className="icon-chevron sidenav-nav-link-icon"></i>
                                        ) : null}
                                    </Link>
                                    {activeSubMenu === subIndex &&
                                        subItem.subSubItems && (
                                            <ul className="sublevel-nav-B">
                                                {subItem.subSubItems.map(
                                                    (
                                                        subSubItem,
                                                        subSubIndex
                                                    ) => (
                                                        <li
                                                            key={subSubIndex}
                                                            className="sublevel-nav-item-B"
                                                        >
                                                            <Link
                                                                href={
                                                                    subSubItem.routeLink
                                                                }
                                                                className="sublevel-nav-link"
                                                            >
                                                                {
                                                                    subSubItem.label
                                                                }
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                </li>
                            ))}
                        </ul>
                    )} */}
                
            
        </ul>
    );
};

export default OtherSidebarNavs;
