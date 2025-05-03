import React from 'react';
import ConfigurationCategoryList from './ConfigurationCategoryList';
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const PermissionInnerLayout = ({siteData}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <ConfigurationHeaderMenus title="Configurations" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <div title="Assign Modules to School" /> 
                    <ConfigurationCategoryList 
                        siteData = {siteData}
                        />
                </div>
            </div>
        </div>
    );
};

export default PermissionInnerLayout;