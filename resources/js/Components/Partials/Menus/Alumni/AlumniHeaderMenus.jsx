import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import AlumniMobileNavs from './AlumniMobileNavs'

const AlumniHeaderMenus = ({ title = '' }) => {

    {/* Toggle Mobile Navs function Start */ }
    const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
    const toggleMobileNavsShow = () => {
        setIsMobileNavsShow(!isMobileNavsShow);
    };
    {/* Toggle Mobile Navs function End */ }

    return (
        <>
            <div className='educare-mis-report-menu-area'>
                <div className="educare-mis-report-menu">
                    <div className="educare-mis-report-menu-left">
                        <div className="educare-mis-report-menu-left-inner">
                            <i className='icon-cap'></i>
                            <h4>{title}</h4>
                        </div>
                    </div>
                    <div className="educare-mis-report-menu-right">
                        <div className="educare-mis-report-category">
                            <div className="educare-mis-report-category-wrap hidden sm:inline-block">
                                <ul>
                                    <li>
                                        <Link href={route('alumni.create')}>Add Alumni</Link>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Reports
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('alumni.list')}>
                                                    Alumni List
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('alumni.payment')}>
                                                    Payment List
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                </ul>
                            </div>
                            {/* Mobile Navs Activation Start */}
                            <div className="educare-sidebar-navs-btn sm:hidden inline-block">
                                <button type='button' onClick={toggleMobileNavsShow}>Menus <i className='icon-CaretDown'></i></button>
                            </div>
                            {/* Mobile Navs Activation End */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Navs Component Start */}
            <AlumniMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default AlumniHeaderMenus;

