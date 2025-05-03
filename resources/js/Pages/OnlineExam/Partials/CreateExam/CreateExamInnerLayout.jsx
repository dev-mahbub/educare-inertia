import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import CreateExamForm from './CreateExamForm';


const CreateExamInnerLayout = ({
    virtualExamModes,
    classNames,
    subjects,
    virtualExam
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Exam Create" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateExamForm
                        virtualExamModes={virtualExamModes}
                        classNames={classNames}
                        subjects={subjects}
                        virtualExam={virtualExam}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateExamInnerLayout;
