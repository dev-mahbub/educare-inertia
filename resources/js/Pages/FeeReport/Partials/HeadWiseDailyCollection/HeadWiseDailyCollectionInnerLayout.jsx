import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import HeadWiseDailyCollectionFilterForm from './HeadWiseDailyCollectionFilterForm';
import HeadWiseDailyCollectionList from './HeadWiseDailyCollectionList';
import HeadWiseDailyCollectionTopBar from './HeadWiseDailyCollectionTopBar';

const HeadWiseDailyCollectionInnerLayout = ({
    classNames = [],
    paymentModes = [],
    feeTypes = [],
    studentFeeReports = [],
    payment_fee_types = []
}) => {

    const [studentPaymentReportsData, setStudentPaymentReportsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalReportCount, setTotalReportCount] = useState(0);
    const [sortBy, setSortBy] = useState("receipt_no");
    const [paymentFeeTypeData, setPaymentFeeTypeData] = useState([]);
    const [params, setParams] = useState({});


    useEffect(() => {
        setTotalReportCount(() => {
            let total_count = 0;

            Object.values(studentFeeReports)?.forEach(item => {
                total_count += item?.reports?.length
            })

            return total_count;
        });

        setStudentPaymentReportsData(studentFeeReports)
        setLoading(false);
    }, [studentFeeReports]);


    useEffect(() => {
        setPaymentFeeTypeData(payment_fee_types)
    }, [payment_fee_types]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <HeadWiseDailyCollectionTopBar
                        setSortBy={setSortBy}
                        sortBy={sortBy}
                        totalReportCount={totalReportCount}
                        params={params}
                    />
                    <HeadWiseDailyCollectionFilterForm
                        classNames={classNames}
                        paymentModes={paymentModes}
                        feeTypes={feeTypes}
                        setStudentPaymentReportsData={setStudentPaymentReportsData}
                        setLoading={setLoading}
                        totalReportCount={totalReportCount}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        setPaymentFeeTypeData={setPaymentFeeTypeData}
                        setTotalReportCount={setTotalReportCount}
                        setParams={setParams}
                    />
                    <HeadWiseDailyCollectionList
                        studentPaymentReportsData={studentPaymentReportsData}
                        loading={loading}
                        payment_fee_types={paymentFeeTypeData}
                    />
                </div>
            </div>
        </div>
    );
};

export default HeadWiseDailyCollectionInnerLayout;
