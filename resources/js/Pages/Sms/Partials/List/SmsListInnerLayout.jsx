import React from 'react';
import SmsMenuCategory from '../../SmsMenuCategory';
import SmsNewList from './SmsNewList';

const SmsListInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <SmsMenuCategory />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <SmsNewList />
                </div>
            </div>
        </div>
    );
};

export default SmsListInnerLayout;