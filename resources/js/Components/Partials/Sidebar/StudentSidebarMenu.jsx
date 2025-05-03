import React from 'react';
import userImg from '../../../../images/user/author.png';
import StudentOtherSidebarNavs from './StudentOtherSidebarNavs';
import StudentSidebarNavs from './StudentSidebarNavs';
import { Link } from '@inertiajs/react';

const StudentSidebarMenu = ({siteData}) => {
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
                        <div
                            type="button"
                            className="inline-flex items-center text-[16px] font-medium text-headingLight cursor-pointer gap-x-2"
                        >
                        <strong>{`${siteData?.authUser?.first_name} ${(siteData?.authUser?.middle_name != null) ? siteData?.authUser?.middle_name : ''} ${(siteData?.authUser?.last_name != null) ? siteData?.authUser?.last_name : ''}`}</strong>(<Link href={route('academic_syllabus.list')}>Edit</Link>)
                        </div>
                    </div>
                </div>
                    
                <div className="educare-sidebar-nav-title">
                    <span>{siteData.isMainPortal ? 'Menu' : 'Main Menu'}</span>
                </div>
                <div className="educare-sidebar-navigation mb-6">
                    <nav>
                        <StudentSidebarNavs siteData={siteData} />
                    </nav>
                </div>
                <div className="educare-sidebar-nav-title mb-1">
                    <span>Other</span>
                </div>
                <div className="educare-sidebar-navigation">
                    <nav>
                        <StudentOtherSidebarNavs />
                    </nav>
                </div>
                <div className="educare-sidebar-footer pt-40 pb-7">
                    <h5>Student Panel</h5>
                    <span>Made <i>♥</i> by Educare study</span>
                </div>
            </div>
        </div>
    );
};

export default StudentSidebarMenu;