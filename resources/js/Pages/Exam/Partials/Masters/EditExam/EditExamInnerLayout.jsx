import AcademicsHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsHeaderMenu';
import EditExamForm from './EditExamForm';

const EditExamInnerLayout = ({
    exam,
    exams,
    classrooms
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AcademicsHeaderMenu title="Academics Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditExamForm
                        exam={exam}
                        exams={exams}
                        classrooms={classrooms}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditExamInnerLayout;
