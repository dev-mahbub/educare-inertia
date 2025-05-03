import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import { useState } from 'react';
import GeneratedTCReportFilter from './GeneratedTCReportFilter';
import GeneratedTCReportTable from './GeneratedTCReportTable';
import GeneratedTCReportTopbar from './GeneratedTCReportTopbar';

const GeneratedTCReportInnerLayout = ({
    generatedTc,
    classrooms,
    academicSession,
    statusArr,
}) => {

    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({});

    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <StudentHeaderMenus title="STUDENTS" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <GeneratedTCReportTopbar
                            params={params}
                            generatedTcLength={generatedTc?.length}
                        />
                        <GeneratedTCReportFilter
                            generatedTcLength={generatedTc?.length}
                            setLoading={setLoading}
                            classrooms={classrooms}
                            academicSession={academicSession}
                            statusArr={statusArr}
                            setParams={setParams}
                        />
                        <GeneratedTCReportTable
                            generatedTc={generatedTc}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GeneratedTCReportInnerLayout;
