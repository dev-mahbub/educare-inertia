// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";
import SetExamRoasterForm from "./SetExamRoasterForm";

const SetExamRoasterInnerLayout = ({
    classNames,
    exams,
    classroomExamRoasterData,
}) => {
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
                    <SetExamRoasterForm
                        classNames={classNames}
                        exams={exams}
                        classroomExamRoasterData={classroomExamRoasterData}
                    />
                </div>
            </div>
        </div>
    );
};

export default SetExamRoasterInnerLayout;
