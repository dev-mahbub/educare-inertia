import React from 'react';
import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import EditVoucherSettingForm from './EditVoucherSettingForm';

const EditVoucherSettingInnerLayout = ({ vouchers, voucher }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditVoucherSettingForm
                        vouchers={vouchers}
                        voucher={voucher}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditVoucherSettingInnerLayout;
