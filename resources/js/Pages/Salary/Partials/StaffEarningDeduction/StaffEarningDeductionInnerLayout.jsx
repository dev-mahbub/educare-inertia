import SalaryHeaderMenu from "@/Components/Partials/Menus/Salary/SalaryHeaderMenu";
import StaffEarningDeductionFormTableMain from "./StaffEarningDeductionFormTableMain";

const StaffEarningDeductionInnerLayout = ({
    staffs,
    payScales,
    staffEarning,
    earningTypes,
    deductionTypes,
    staff
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <SalaryHeaderMenu title="Salary Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <div className="educare-parent-montly-income-area">
                            <StaffEarningDeductionFormTableMain
                                staffs={staffs}
                                payScales={payScales}
                                staffEarning={staffEarning}
                                earningTypes={earningTypes}
                                deductionTypes={deductionTypes}
                                staff={staff}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaffEarningDeductionInnerLayout;
