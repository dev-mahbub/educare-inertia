import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import ExamSummaryFilter from './ExamSummaryFilter';
import ExamSummaryList from './ExamSummaryList';


const ExamSummaryInnerLayout = ({
    virtualExams
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Exam Summary" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ExamSummaryFilter
                        virtualExams={virtualExams}
                    />
                    <ExamSummaryList
                        virtualExams={virtualExams}
                    />
                </div>
            </div>
        </div>
    );
};

export default ExamSummaryInnerLayout;
