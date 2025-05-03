import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import ModuleMobileNavs from './ModuleMobileNavs'

const ModuleHeaderMenus = ({siteData}) => {
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
                            <h4>Modules</h4>
                        </div>
                    </div>
                    <div className="educare-mis-report-menu-right">
                        <div className="educare-mis-report-category">
                            <div className="educare-mis-report-category-wrap hidden sm:inline-block">
                                <ul>
                                    {siteData?.authRoles && siteData?.authRoles.indexOf('Super Admin') > -1 &&
                                    <li>
                                        <Link href="/modules">Assign Modules to School</Link>
                                    </li>
                                    }
                                    <li>
                                        <Link href="/permissions">Assign Modules to User</Link>
                                    </li>
                                    
                                    {/*<li>
                                    <Link href="/mobile-permission-to-school">Mobile Permission to School</Link>
                                </li>
                                <li>
                                    <Link href="/mobile-permission-to-admin">Mobile Permission to Admin</Link>
                                </li>*/}
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
            <ModuleMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default ModuleHeaderMenus;
