import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import ExamDetailsFiter from './ExamDetailsFiter';
import ExamDetailsList from './ExamDetailsList';
import ExamDetailsTop from './ExamDetailsTop';


const ExamDetailsInnerlayout = ({
    virtualExam
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Exam Details" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ExamDetailsTop
                        virtualExam={virtualExam}
                    />
                    <ExamDetailsFiter
                        virtualExam={virtualExam}
                    />
                    <ExamDetailsList
                        virtualExam={virtualExam}
                    />
                </div>
            </div>
        </div>
    );
};

export default ExamDetailsInnerlayout;
