import SchoolShiftMenu from "../../../Components/Partials/Menus/SchoolShift/SchoolShiftMenu";
import SchoolPeriodForm from "./SchoolPeriodForm";

const CreatePeriodInnerLayout = ({
    schoolShifts,
    schoolPeriods
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
                    <SchoolPeriodForm
                        className=""
                        schoolShifts={schoolShifts}
                        schoolPeriods={schoolPeriods}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreatePeriodInnerLayout;
