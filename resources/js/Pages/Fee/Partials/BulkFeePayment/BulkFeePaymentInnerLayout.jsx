import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import BulkFeePaymentFilter from './BulkFeePaymentFilter';
import BulkFeePaymentList from './BulkFeePaymentList';
import BulkFeePaymentTopbar from './BulkFeePaymentTopbar';

const BulkFeePaymentInnerLayout = ({
    classrooms = [],
    fees = [],
    banks = [],
    bankAccounts = [],
    paymentModes = [],
    employmentCategories = [],
    studentFeeInstallments = [],
    students = []
}) => {
    const [formFields, setFormFields] = useState({});
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [feeTypeAmountData, setFeeTypeAmountData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [feeId, setFeeId] = useState(null);

    useEffect(() => {
        setLoading(false);
    }, [students]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <BulkFeePaymentTopbar
                        selectedStudentIds={selectedStudentIds}
                        feeTypeAmountData={feeTypeAmountData}
                    />
                    <BulkFeePaymentFilter
                        classrooms={classrooms}
                        fees={fees}
                        employmentCategories={employmentCategories}
                        setLoading={setLoading}
                        students={students}
                        setFeeId={setFeeId}
                        selectedStudentIds={selectedStudentIds}
                        setSelectedStudentIds={setSelectedStudentIds}
                        setFormFields={setFormFields}
                        formFields={formFields}
                    />
                    <BulkFeePaymentList
                        banks={banks}
                        bankAccounts={bankAccounts}
                        paymentModes={paymentModes}
                        studentFeeInstallments={studentFeeInstallments}
                        loading={loading}
                        students={students}
                        feeId={feeId}
                        selectedStudentIds={selectedStudentIds}
                        setSelectedStudentIds={setSelectedStudentIds}
                        setFormFields={setFormFields}
                        formFields={formFields}
                        feeTypeAmountData={feeTypeAmountData}
                        setFeeTypeAmountData={setFeeTypeAmountData}
                    />
                </div>
            </div>
        </div>
    );
};

export default BulkFeePaymentInnerLayout;
