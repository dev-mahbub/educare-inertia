import React from 'react';
import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu'
import TakenExamList from './TakenExamList';
import TakenExamFilter from './TakenExamFilter';


const TakenExamInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Report" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <TakenExamFilter />
                    <TakenExamList />
                </div>
            </div>
        </div>
    );
};

export default TakenExamInnerLayout;