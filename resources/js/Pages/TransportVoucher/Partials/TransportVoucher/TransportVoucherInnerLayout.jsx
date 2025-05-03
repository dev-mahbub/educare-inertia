import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import TransportVoucherFilter from './TransportVoucherFilter';
import TransportVoucherList from './TransportVoucherList';

const TransportVoucherInnerLayout = ({
    vouchers = [],
    classNames = [],
    classrooms = [],
    voucherStatusArray = [],
    transportVoucherReport = []
}) => {
    const [selectedClassroomIds, setSelectedClassroomIds] = useState([]);
    const [transportVoucherReportData, setTransportVoucherReportData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTransportVoucherReportData(transportVoucherReport);
        setLoading(false);
    }, [transportVoucherReport]);


    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <TransportVoucherFilter
                        vouchers={vouchers}
                        voucherStatusArray={voucherStatusArray}
                        selectedClassroomIds={selectedClassroomIds}
                        transportVoucherReport={transportVoucherReportData}
                        setLoading={setLoading}
                    />
                    <TransportVoucherList
                        classNames={classNames}
                        classrooms={classrooms}
                        selectedClassroomIds={selectedClassroomIds}
                        setSelectedClassroomIds={setSelectedClassroomIds}
                        transportVoucherReport={transportVoucherReportData}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default TransportVoucherInnerLayout;
