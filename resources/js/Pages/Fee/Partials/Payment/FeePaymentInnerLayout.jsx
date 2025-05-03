import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import FeePaymentMain from './FeePaymentMain';

const FeePaymentInnerLayout = ({
    classrooms= [],
    students = [],
    banks = [],
    paymentModes = [],
    studentFeeInstallments = [],
    studentFeeVouchers = [],
    studentFeePaymentReports = [],
    filteredStudentsData = [],
    student = {},
    studentFeeDiscount = {},
    discounts = [],
    bankAccounts = [],
    extraFeeTypes = [],
    studentTransportVouchers = [],
    autoSelectFee,
    selectFeeSequentially,
    feeReceiptPageSize,
    feeReceiptCopy,
    isBackDateAllowed
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
                    <FeePaymentMain
                        classrooms={classrooms}
                        students={students}
                        banks={banks}
                        paymentModes={paymentModes}
                        studentFeeInstallments={studentFeeInstallments}
                        studentFeeVouchers={studentFeeVouchers}
                        studentFeePaymentReports={studentFeePaymentReports}
                        filteredStudentsData={filteredStudentsData}
                        student={student}
                        studentFeeDiscount={studentFeeDiscount}
                        discounts={discounts}
                        bankAccounts={bankAccounts}
                        extraFeeTypes={extraFeeTypes}
                        studentTransportVouchers={studentTransportVouchers}
                        autoSelectFee={autoSelectFee}
                        selectFeeSequentially={selectFeeSequentially}
                        feeReceiptPageSize={feeReceiptPageSize}
                        feeReceiptCopy={feeReceiptCopy}
                        isBackDateAllowed={isBackDateAllowed}
                     />
                </div>
            </div>
        </div>
    );
};

export default FeePaymentInnerLayout;
