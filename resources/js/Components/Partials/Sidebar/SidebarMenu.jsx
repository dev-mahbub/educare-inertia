import React from 'react';
import SidebarNavs from './SidebarNavs';
import OtherSidebarNavs from './OtherSidebarNavs';

const SidebarMenu = ({siteData}) => {
    return (
        <div className='educare-sidebar-area'>
            <div className="educare-sidebar-main">
                <div className="educare-sidebar-school">
                {siteData.schoolCode &&
                    <span>School Key: <a href="#">{siteData.schoolCode}</a></span>
                }
                </div>
                <div className="educare-sidebar-nav-title">
                    <span>{siteData.isMainPortal ? 'Menu' : 'Main Menu'}</span>
                </div>
                <div className="educare-sidebar-navigation navigation-scroll mb-6">
                    <nav>
                        <SidebarNavs siteData={siteData} />
                    </nav>
                </div>
                <div className="educare-sidebar-nav-title mb-5">
                    <span hidden>Other</span>
                </div>
                <div className="educare-sidebar-navigation">
                    <nav>
                        <OtherSidebarNavs siteData={siteData} />
                    </nav>
                </div>
                <div className="educare-sidebar-footer pt-8 pb-5">
                    <h5>School Admin Dashboard</h5>
                    <span>Made <i>♥</i> by Educare study</span>
                </div>
                <div className="educare-sidebar-nav-title-copyright">
                    <span>©Educare Study | All rights reserved.</span>
                </div>
            </div>
        </div>
    );
};

export default SidebarMenu;