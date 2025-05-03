import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import StudentPaymentsFilter from './StudentPaymentsFilter';
import StudentPaymentsList from './StudentPaymentsList';

const StudentPaymentsInnerLayout = ({
    classrooms = [],
    students = [],
    student = {},
    studentFeePaymentReports = [],
    feeReceiptPageSize,
    feeReceiptCopy
}) => {
    const [studentFeePaymentReportsData, setStudentFeePaymentReportsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [totalPaidAmount, setTotalPaidAmount] = useState(0);

    useEffect(() => {
        setSelectedStudent(student);
    }, [student]);

    useEffect(() => {
        setStudentFeePaymentReportsData(studentFeePaymentReports);
        setLoading(false);
        setTotalPaidAmount(Object.values(studentFeePaymentReports)?.reduce((total, item) => total + parseFloat(item?.total_paid ?? 0), 0));
    }, [studentFeePaymentReports]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentPaymentsFilter
                        classrooms={classrooms}
                        students={students}
                        selectedStudent={selectedStudent}
                        setSelectedStudent={setSelectedStudent}
                        setLoading={setLoading}
                    />
                    <StudentPaymentsList
                        studentFeePaymentReports={studentFeePaymentReportsData}
                        loading={loading}
                        totalPaidAmount={totalPaidAmount}
                        feeReceiptPageSize={feeReceiptPageSize}
                        feeReceiptCopy={feeReceiptCopy}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentPaymentsInnerLayout;
