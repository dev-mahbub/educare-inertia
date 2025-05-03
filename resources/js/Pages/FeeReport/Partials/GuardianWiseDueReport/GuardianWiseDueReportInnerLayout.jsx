
import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import GuardianWiseDueReportFilter from './GuardianWiseDueReportFilter';
import GuardianWiseDueReportList from './GuardianWiseDueReportList';
import GuardianWiseDueReportTopbar from './GuardianWiseDueReportTopbar';

const GuardianWiseDueReportInnerLayout = ({
    classrooms = [],
    fees = [],
    student_status_array = [],
    guardian_array = [],
    payment_status_array = [],
    guardianWiseReport = [],
    transport_routes = []
}) => {
    const [guardianWiseReportData, setGuardianWiseReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalPayable, setTotalPayable] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalDue, setTotalDue] = useState(0);

    useEffect(() => {
        setGuardianWiseReportData(guardianWiseReport);
        setLoading(false);
    }, [guardianWiseReport]);

    useEffect(() => {
        if (Object.keys(guardianWiseReportData)?.length > 0) {
            setTotalAmount(Object?.values(guardianWiseReportData)?.reduce((total, item) => total + item?.total_amount, 0));
            setTotalDiscount(Object?.values(guardianWiseReportData)?.reduce((total, item) => total + item?.total_discount, 0));
            setTotalPayable(Object?.values(guardianWiseReportData)?.reduce((total, item) => total + item?.total_payable, 0));
            setTotalPaid(Object?.values(guardianWiseReportData)?.reduce((total, item) => total + item?.total_paid, 0));
            setTotalDue(Object?.values(guardianWiseReportData)?.reduce((total, item) => total + item?.total_due, 0));
        }
    }, [guardianWiseReportData])


    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <GuardianWiseDueReportTopbar
                        totalAmount={totalAmount}
                        totalDiscount={totalDiscount}
                        totalPayable={totalPayable}
                        totalPaid={totalPaid}
                        totalDue={totalDue}
                        params={params}
                        guardianWiseReport={guardianWiseReportData}
                    />
                    <GuardianWiseDueReportFilter
                        classrooms={classrooms}
                        fees={fees}
                        student_status_array={student_status_array}
                        guardian_array={guardian_array}
                        payment_status_array={payment_status_array}
                        transport_routes={transport_routes}
                        guardianWiseReport={guardianWiseReportData}
                        setLoading={setLoading}
                        setParams={setParams}
                    />
                    <GuardianWiseDueReportList
                        guardianWiseReport={guardianWiseReportData}
                        loading={loading}
                        params={params}
                    />
                </div>
            </div>
        </div>
    );
};

export default GuardianWiseDueReportInnerLayout;
