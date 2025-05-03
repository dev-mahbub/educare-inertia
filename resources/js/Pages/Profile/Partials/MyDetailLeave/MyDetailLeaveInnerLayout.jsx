import React from 'react';
import MyDetailMenus from '../../../../Components/Partials/Menus/MyDetail/MyDetailMenus';
import MyDetailLeaveTable from './MyDetailLeaveTable';

const MyDetailLeaveInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <MyDetailMenus title="MY DETAIL" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <MyDetailLeaveTable />
                </div>
            </div>
        </div>
    );
};

export default MyDetailLeaveInnerLayout;