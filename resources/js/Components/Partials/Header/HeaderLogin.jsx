import React from "react";
import siteLogo from "../../../../images/logo/educarelogo.png";
import { Link } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import Dropdown from "@/Components/Dropdown";

const HeaderLogin = () => {
    const frontHeaderMenuData = [
        {
            id: 1,
            link: route('dashboard'),
            title: "Dashboard",
            hasDropdown: false,
            megamenu: false,
        },
        {
            id: 6,
            link: route('front_page.about'),
            title: "About Us",
            hasDropdown: false,
            megamenu: false,
        },
        {
            id: 6,
            link: route('front_page.contactus'),
            title: "Contact Us",
            hasDropdown: false,
            megamenu: false,
        },
        {
            id: 7,
            link: route('support_ticket.student_parents_support'),
            title: "Support",
            hasDropdown: true,
            megamenu: false,
            subItems: [
                { link: route('support_ticket.student_parents_support'), title: "Get User id and Password" },
                { link: route('support_ticket.student_parents_support'), title: "Request For Login details" },
                { link: route('support_ticket.student_parents_support'), title: "Give Feedback" },
            ],
        },
    ]
    return (
        <div className="front-header-main">
            <div className="front-container">
                <div className="educare-dashboard-header">
                    <div className="pl-5 xxxl:pl-0">
                        <div className="inline-flex gap-2.5 items-center">
                            <Link href={route('dashboard')}>
                            <img
                                className="max-w-[160px]"
                                src={siteLogo}
                                alt="logo"
                            />
                            </Link>
                        </div>
                    </div>
                    <div className="header-menus">
                        <div className="educare-mis-report-menu-right">
                            <div className="educare-mis-report-category front-header-category">
                                <div className="educare-mis-report-category-wrap">
                                    <ul>
                                        {
                                            frontHeaderMenuData.length > 0 &&
                                            frontHeaderMenuData.map((menu, index) =>
                                                <li key={index}>
                                                    {!menu.hasDropdown && <Link href={menu.link}>{menu.title}</Link>}
                                                    {menu.hasDropdown && <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <div
                                                                type="button"
                                                                className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                            >
                                                                {menu.title}
                                                                <i className='icon-CaretDown'></i>
                                                            </div>
                                                        </Dropdown.Trigger>

                                                        {menu?.subItems?.length > 0 && (
                                                            <Dropdown.Content>
                                                                {menu.subItems.map((subMenu, subIndex) => (
                                                                    <Dropdown.Link href={subMenu?.link} key={subIndex}>
                                                                        {subMenu?.title}
                                                                    </Dropdown.Link>
                                                                ))}
                                                            </Dropdown.Content>
                                                        )}

                                                    </Dropdown>}
                                                </li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="ml-5 hidden">
                            <PrimaryButton
                                // disabled={processing}
                                className="educare-secondary-btn-md-fill"
                            >
                                Request a Demo
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderLogin;
