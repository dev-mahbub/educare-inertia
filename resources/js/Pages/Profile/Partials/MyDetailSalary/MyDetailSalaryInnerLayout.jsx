import React from 'react';
import MyDetailMenus from '../../../../Components/Partials/Menus/MyDetail/MyDetailMenus';
import MyProfileCategoryList from './MyProfileCategoryList'

const MyDetailSalaryInnerLayout = ({siteData}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <MyDetailMenus title="My Profile" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <MyProfileCategoryList siteData={siteData} />
                </div>
            </div>
        </div>
    );
};

export default MyDetailSalaryInnerLayout;