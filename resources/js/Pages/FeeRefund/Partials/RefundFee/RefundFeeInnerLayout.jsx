import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import RefundFee from './RefundFee';

const RefundFeeInnerLayout = ({
    studentFeeInstallments = [],
    classrooms = [],
    students = [],
    feeRefundPaymentModes = [],
    studentFeePaymentRefunds = [],
    banks= [],
    student
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <RefundFee
                        studentFeeInstallments={studentFeeInstallments}
                        classrooms={classrooms}
                        students={students}
                        feeRefundPaymentModes={feeRefundPaymentModes}
                        studentFeePaymentRefunds={studentFeePaymentRefunds}
                        banks={banks}
                        student={student}
                    />
                </div>
            </div>
        </div>
    );
};

export default RefundFeeInnerLayout;
