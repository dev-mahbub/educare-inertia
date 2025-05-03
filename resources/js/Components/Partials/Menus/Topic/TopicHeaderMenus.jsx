import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import TopicMobileNavs from './TopicMobileNavs'

const TopicHeaderMenus = ({title}) => {

    {/* Toggle Mobile Navs function Start */ }
    const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
    const toggleMobileNavsShow = () => {
        setIsMobileNavsShow(!isMobileNavsShow);
    };
    {/* Toggle Mobile Navs function End */ }

    return (
        <>
            <div className='educare-mis-report-menu-area bg-white'>
                <div className="educare-mis-report-menu">
                    <div className="educare-mis-report-menu-left">
                        <div className="educare-mis-report-menu-left-inner">
                            <i className='icon-cap'></i>
                            <h4>{`${title ? title : "Topics"}`}</h4>
                        </div>
                    </div>
                    <div className="educare-mis-report-menu-right">
                        <div className="educare-mis-report-category">
                            <div className="educare-mis-report-category-wrap hidden sm:inline-block">
                                <ul>
                                    <li>
                                        <Link href="#"><i className="icon-PlusCircle"></i> Add/Edit Class</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Assign Class Teachers</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Assign Display Order</Link>
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
            {/* <TopicMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} /> */}
            {/* Mobile Navs Component End */}
        </>
    );
};

export default TopicHeaderMenus;
