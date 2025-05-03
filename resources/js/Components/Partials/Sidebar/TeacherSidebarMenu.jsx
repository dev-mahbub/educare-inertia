import React from 'react';
import TeacherSidebarNavs from './TeacherSidebarNavs';
import userImg from '../../../../images/user/author.png';
import { Link } from '@inertiajs/react';
import TeacherOtherSidebarNavs from './TeacherOtherSidebarNavs';

const TeacherSidebarMenu = ({siteData}) => {
    return (
        <div className='educare-sidebar-area'>
            <div className="educare-sidebar-main">
                <div className="educare-sidebar-nav-title educare-student-sidebar-profile">
                    <div className="educare-dashboard-header-info-profile-img">
                        <button type="button">
                            <img src={userImg} alt="user img" />
                        </button>
                    </div>
                    <div className="educare-dashboard-header-info-profile-text">
                        <div type="button" className="inline-flex items-center text-[16px] font-medium text-headingLight gap-x-2">
                            <strong>{`${siteData?.authUser?.first_name} ${(siteData?.authUser?.middle_name != null) ? siteData?.authUser?.middle_name : ''} ${(siteData?.authUser?.last_name != null) ? siteData?.authUser?.last_name : ''}`}</strong>
                        </div>
                    </div>
                </div>
                <div className="educare-sidebar-nav-title">
                    <span>Main Menu</span>
                </div>
                <div className="educare-sidebar-navigation mb-6">
                    <nav> 
                        <TeacherSidebarNavs siteData={siteData} />
                    </nav>
                </div>
                <div className="educare-sidebar-nav-title mb-1">
                    <span>My Profile</span>
                </div>
                <div className="educare-sidebar-navigation">
                    <nav>
                        <TeacherOtherSidebarNavs />
                    </nav>
                </div>
                <div className="educare-sidebar-footer pt-10 pb-7">
                    <h5>Teacher Panel</h5>
                    <span>Made <i>♥</i> by Educare study</span>
                </div>
            </div>
        </div>
    );
};

export default TeacherSidebarMenu;