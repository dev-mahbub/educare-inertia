// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu';
import UploadExamMarksForm from "./UploadExamMarksForm";

const UploadExamMarksInnerLayout = ({ exams, classrooms, subjects }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        {/* <AcademicsHeaderMenu title="Academics Management" /> */}
                        <AcademicsExamHeaderMenu title="Academics Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <UploadExamMarksForm
                        exams={exams}
                        classrooms={classrooms}
                        subjects={subjects}
                    />
                </div>
            </div>
        </div>
    );
};

export default UploadExamMarksInnerLayout;
