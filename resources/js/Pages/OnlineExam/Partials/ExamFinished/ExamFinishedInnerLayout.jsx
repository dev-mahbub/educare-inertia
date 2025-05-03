import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import ExamFinish from './ExamFinish';


const ExamFinishedInnerLayout = ({
    virtualExam
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Exam / Finish" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ExamFinish
                        virtualExam={virtualExam}
                    />
                </div>
            </div>
        </div>
    );
};

export default ExamFinishedInnerLayout;
