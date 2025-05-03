import React from 'react';
import StaffSupportArticle from './StaffSupportArticle';
import StaffSupportTitle from './StaffSupportTitle';
import StaffSupportCategory from './StaffSupportCategory';

const StaffSupportInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StaffSupportTitle />
                    <StaffSupportCategory />
                    <StaffSupportArticle />
                </div>
            </div>
        </div>
    );
};

export default StaffSupportInnerLayout;