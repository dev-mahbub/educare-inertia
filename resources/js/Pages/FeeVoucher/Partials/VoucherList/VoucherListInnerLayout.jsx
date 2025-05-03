import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import { useEffect, useState } from 'react';
import VoucherFilter from './VoucherFilter';
import VoucherList from './VoucherList';

const VoucherListInnerLayout = ({
    studentFeeVouchers = [],
    classrooms = [],
    voucherStatusArray = [],
    students = [],
    student
}) => {
    const [feeVouchersData, setFeeVouchersData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setFeeVouchersData(studentFeeVouchers);
        setLoading(false);
    }, [studentFeeVouchers]);

     return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                     <VoucherFilter
                        classrooms={classrooms}
                        studentFeeVouchers={studentFeeVouchers}
                        setFeeVouchersData={setFeeVouchersData}
                        voucherStatusArray={voucherStatusArray}
                        setLoading={setLoading}
                        students={students}
                        student={student}
                     />
                     <VoucherList
                         studentFeeVouchers={feeVouchersData}
                         loading={loading}
                     />
                </div>
            </div>
        </div>
    );
};

export default VoucherListInnerLayout;
