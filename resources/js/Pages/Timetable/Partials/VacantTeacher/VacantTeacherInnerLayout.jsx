import SchoolShiftMenu from "../../../../Components/Partials/Menus/SchoolShift/SchoolShiftMenu";
import VacantTeacherList from "./VacantTeacherList";
import VacantTeacherTableHeader from "./VacantTeacherTableHeader";

const VacantTeacherInnerLayout = ({
    schoolShifts,
    schoolPeriods,
    currentDate,
    teachers
}) => {

    const totalTeacherCount = teachers?.length;

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <SchoolShiftMenu title="Time Table Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <VacantTeacherTableHeader
                        schoolShifts={schoolShifts}
                        schoolPeriods={schoolPeriods}
                        totalTeacherCount={totalTeacherCount}
                    />
                    <VacantTeacherList
                        currentDate={currentDate}
                        teachers={teachers}
                        totalTeacherCount={totalTeacherCount}
                    />
                </div>
            </div>
        </div>
    );
};

export default VacantTeacherInnerLayout;
