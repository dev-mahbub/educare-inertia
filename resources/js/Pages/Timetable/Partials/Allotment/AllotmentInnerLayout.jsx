import SchoolShiftMenu from "../../../../Components/Partials/Menus/SchoolShift/SchoolShiftMenu";
import AllotmentHeader from "./AllotmentHeader";
import AllotmentList from "./AllotmentList";

const AllotmentInnerLayout = ({
    currentDate,
    schoolShifts,
    schoolPeriods,
    classNames,
    timetables
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
                    <AllotmentHeader
                        currentDate={currentDate}
                        schoolShifts={schoolShifts}
                        schoolPeriods={schoolPeriods}
                        classNames={classNames}
                    />
                    <AllotmentList
                        schoolPeriods={schoolPeriods}
                        timetables={timetables}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllotmentInnerLayout;
