import SchoolShiftMenu from "../../../Components/Partials/Menus/SchoolShift/SchoolShiftMenu";
import ClassPeriodForm from "./ClassPeriodForm";

const CreateClassPeriodInnerLayout = ({
    schoolShifts,
    schoolPeriods,
    classrooms,
    classroomPeriods
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <SchoolShiftMenu title="Time Table Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ClassPeriodForm
                        schoolShifts={schoolShifts}
                        schoolPeriods={schoolPeriods}
                        classrooms={classrooms}
                        classroomPeriods={classroomPeriods}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateClassPeriodInnerLayout;
