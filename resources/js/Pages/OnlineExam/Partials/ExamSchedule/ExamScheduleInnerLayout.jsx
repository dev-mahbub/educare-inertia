import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import ExamScheduleFilter from './ExamScheduleFilter';
import ExamScheduleList from './ExamScheduleList';

const ExamScheduleInnerLayout = ({
    virtualExams,
    virtualExamModes,
    classNames,
    subjects
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Exam Schedule" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ExamScheduleFilter
                        virtualExamModes={virtualExamModes}
                        classNames={classNames}
                        subjects={subjects}
                    />
                    <ExamScheduleList
                        virtualExams={virtualExams}
                    />
                </div>
            </div>
        </div>
    );
};

export default ExamScheduleInnerLayout;
