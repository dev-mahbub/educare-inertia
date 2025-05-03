import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import StudentAvailingDiscountFilter from './StudentAvailingDiscountFilter';
import StudentAvailingDiscountList from './StudentAvailingDiscountList';

const StudentAvailingDiscountInnerLayout = ({
    studentFeeDiscounts = [],
    feeTypes = [],
    classrooms = [],
    discounts = []
}) => {
    const [loading, setLoading] = useState(false);
    const [totalReportCount, setTotalReportCount] = useState(0);
    const [studentFeeDiscountsData, setStudentFeeDiscountsData] = useState([]);

    useEffect(() => {
        setStudentFeeDiscountsData(studentFeeDiscounts);
        setLoading(false);
    }, [studentFeeDiscounts]);

    useEffect(() => {
        setTotalReportCount(Object.keys(studentFeeDiscountsData)?.length);
    }, [studentFeeDiscountsData]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentAvailingDiscountFilter
                        studentFeeDiscounts={studentFeeDiscounts}
                        setStudentFeeDiscountsData={setStudentFeeDiscountsData}
                        totalReportCount={totalReportCount}
                        classrooms={classrooms}
                        discounts={discounts}
                        setLoading={setLoading}
                    />
                    <StudentAvailingDiscountList
                        studentFeeDiscounts={studentFeeDiscountsData}
                        feeTypes={feeTypes}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentAvailingDiscountInnerLayout;
