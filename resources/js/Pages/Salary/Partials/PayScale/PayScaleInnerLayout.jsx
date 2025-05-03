import SalaryHeaderMenu from "@/Components/Partials/Menus/Salary/SalaryHeaderMenu";
import PayScaleFormTableMain from "./PayScaleFormTableMain";

const PayScaleInnerLayout = ({
    earningTypes,
    deductionTypes,
    payScales
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
                            <PayScaleFormTableMain
                                earningTypes={earningTypes}
                                deductionTypes={deductionTypes}
                                payScales={payScales}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PayScaleInnerLayout;
