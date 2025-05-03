import React from 'react';
import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu'
import LiveExamList from './LiveExamList';


const LiveExamInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Report" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <LiveExamList />
                </div>
            </div>
        </div>
    );
};

export default LiveExamInnerLayout;