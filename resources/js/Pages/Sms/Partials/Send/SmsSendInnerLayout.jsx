import React from 'react';
import StudentMenuCategory from '../../SmsMenuCategory';
import SmsSentFilter from './SmsSentFilter';
import SmsSendList from './SmsSendList';

const SmsSendInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentMenuCategory />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <SmsSentFilter />
                    <SmsSendList />
                </div>
            </div>
        </div>
    );
};

export default SmsSendInnerLayout;