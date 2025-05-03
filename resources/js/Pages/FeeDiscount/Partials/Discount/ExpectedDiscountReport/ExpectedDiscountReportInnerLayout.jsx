import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import ExpectedDiscountReportFilter from './ExpectedDiscountReportFilter';
import ExpectedDiscountReportList from './ExpectedDiscountReportList';

const ExpectedDiscountReportInnerLayout = ({
    fees = [],
    discounts = [],
    expectedStudentFeeDiscountReport = []
}) => {
    const [expectedStudentFeeDiscountReportData, setExpectedStudentFeeDiscountReportData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setExpectedStudentFeeDiscountReportData(expectedStudentFeeDiscountReport);
        setLoading(false);
    },[expectedStudentFeeDiscountReport])


    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ExpectedDiscountReportFilter
                        fees={fees}
                        discounts={discounts}
                        setLoading={setLoading}
                        expectedStudentFeeDiscountReportData={expectedStudentFeeDiscountReportData}
                    />
                    <ExpectedDiscountReportList
                        expectedStudentFeeDiscountsData={expectedStudentFeeDiscountReportData}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default ExpectedDiscountReportInnerLayout;
