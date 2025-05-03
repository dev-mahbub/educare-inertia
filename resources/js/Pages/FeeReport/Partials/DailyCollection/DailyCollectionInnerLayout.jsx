import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import DailyCollectionFilterForm from './DailyCollectionFilterForm';
import DailyCollectionReportList from './DailyCollectionReportList';
import DailyCollectionTopBar from './DailyCollectionTopBar';

const DailyCollectionInnerLayout = ({
    feeTypesEnum = [],
    classNames = [],
    classrooms = [],
    paymentModes = [],
    dailyFeePaymentReports = [],
    totalPaidByPaymentMode = [],
    totalPaidByAdmin = [],
    feeReceiptPageSize,
    feeReceiptCopy,
    regFeeReceiptPageSize,
    regFeeReceiptCopy
}) => {

    const [dailyFeePaymentReportsData, setDailyFeePaymentReportsData] = useState([]);
    const [totalPaidByPaymentModeData, setTotalPaidByPaymentModeData] = useState([]);
    const [totalPaidByAdminData, setTotalPaidByAdminData] = useState([]);
    const [totalReportCount, setTotalReportCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({});

    useEffect(() => {
        setDailyFeePaymentReportsData(Object.values(dailyFeePaymentReports).sort(customSort))
        setLoading(false);
    }, [dailyFeePaymentReports]);

    useEffect(() => {
        setTotalReportCount(Object.keys(dailyFeePaymentReportsData)?.length);
    }, [dailyFeePaymentReportsData])

    useEffect(() => {
        setTotalPaidByPaymentModeData(totalPaidByPaymentMode)
    }, [totalPaidByPaymentMode]);

    useEffect(() => {
        setTotalPaidByAdminData(totalPaidByAdmin)
    }, [totalPaidByAdmin]);


    // sort reports start
    function customSort(a, b) {
        if (a.receipt_no && b.receipt_no) {
            return a.receipt_no - b.receipt_no;
        } else {
            return -1;
        }
    }
    // sort reports end

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <DailyCollectionTopBar
                        params={params}
                        totalReportCount={totalReportCount}
                    />
                    <DailyCollectionFilterForm
                        feeTypesEnum={feeTypesEnum}
                        classNames={classNames}
                        classrooms={classrooms}
                        paymentModes={paymentModes}
                        totalReportCount={totalReportCount}
                        setLoading={setLoading}
                        setDailyFeePaymentReportsData={setDailyFeePaymentReportsData}
                        setTotalPaidByPaymentModeData={setTotalPaidByPaymentModeData}
                        setTotalPaidByAdminData={setTotalPaidByAdminData}
                        setParams={setParams}
                    />
                    <DailyCollectionReportList
                        dailyFeePaymentReports={dailyFeePaymentReportsData}
                        totalPaidByPaymentMode={totalPaidByPaymentModeData}
                        totalPaidByAdmin={totalPaidByAdminData}
                        loading={loading}
                        feeReceiptPageSize={feeReceiptPageSize}
                        feeReceiptCopy={feeReceiptCopy}
                        regFeeReceiptPageSize={regFeeReceiptPageSize}
                        regFeeReceiptCopy={regFeeReceiptCopy}
                    />
                </div>
            </div>
        </div>
    );
};

export default DailyCollectionInnerLayout;
