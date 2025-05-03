import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import FeeStudentFollowUpFilter from './FeeStudentFollowUpFilter';
import FeeStudentFollowUpList from './FeeStudentFollowUpList';

const FeeStudentFollowUpInnerLayout = ({
    classrooms= [],
    followUpReports = []
}) => {
    const [followUpReportsData, setFollowUpReportsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFollowUpReportsData(followUpReports);
        setLoading(false);
    },[followUpReports]);


    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeeStudentFollowUpFilter
                        classrooms={classrooms}
                        setLoading={setLoading}
                        setFollowUpReportsData={setFollowUpReportsData}
                    />
                    <FeeStudentFollowUpList
                        followUpReports={followUpReportsData}
                        setLoading={setLoading}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeeStudentFollowUpInnerLayout;
