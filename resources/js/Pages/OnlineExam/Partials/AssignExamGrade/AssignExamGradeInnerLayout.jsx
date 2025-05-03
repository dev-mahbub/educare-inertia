import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import AssignExamGradeList from './AssignExamGradeList';


const AssignExamGradeInnerLayout = ({
    virtualExam,
    classrooms
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Exam / Assign Class" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AssignExamGradeList
                        virtualExam={virtualExam}
                        classrooms={classrooms}
                    />
                </div>
            </div>
        </div>
    );
};

export default AssignExamGradeInnerLayout;
