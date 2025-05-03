import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import EditVoucher from './EditVoucher';

const EditVoucherInnerLayout = ({ classrooms = [], students= [], voucher_modes = [], feeTypes = [], studentFeeVoucher = {}, feeVouchersByStudent = [] }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditVoucher classrooms={classrooms} students={students} voucher_modes={voucher_modes} feeTypes={feeTypes} studentFeeVoucher={studentFeeVoucher} feeVouchersByStudent={feeVouchersByStudent} />
                </div>
            </div>
        </div>
    );
};

export default EditVoucherInnerLayout;
