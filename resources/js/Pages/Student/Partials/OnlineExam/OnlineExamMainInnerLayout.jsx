import React from 'react';
import OnlineExamHeaderMenu from './OnlineExamHeaderMenu';
import OnlineExamList from './OnlineExamList';
import OnlineExamFilter from './OnlineExamFilter';

const OnlineExamMainInnerLayout = ({students, studentId, onlineExam, virtualExamModes, virtualExamStatus, subjects, virtualExams}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Dashboard" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-wrap">
                    <div className="educare-dashboard-main-content-body">
                        <div className="educare-dashboard-main-content-body-wrap">
                            <OnlineExamFilter students={students} studentId={studentId} homeWorks={onlineExam} virtualExamStatus={virtualExamStatus} virtualExamModes={virtualExamModes} subjects={subjects}/>
                            <OnlineExamList students={students} studentId={studentId} homeWorks={onlineExam} virtualExams={virtualExams} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineExamMainInnerLayout;