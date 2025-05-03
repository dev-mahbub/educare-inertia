import SalaryHeaderMenu from '@/Components/Partials/Menus/Salary/SalaryHeaderMenu';
import IncrementStaffFormTableMain from './IncrementStaffFormTableMain';

const IncrementStaffSalaryInnerLayout = ({
    staffs,
    staffEarning,
    staff,
    incrementTypes,
    staffSalaryIncrements
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <SalaryHeaderMenu title="Salary Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <IncrementStaffFormTableMain
                        staffs={staffs}
                        staffEarning={staffEarning}
                        staff={staff}
                        incrementTypes={incrementTypes}
                        staffSalaryIncrements={staffSalaryIncrements}
                    />
                </div>
            </div>
        </div>
    );
};

export default IncrementStaffSalaryInnerLayout;
