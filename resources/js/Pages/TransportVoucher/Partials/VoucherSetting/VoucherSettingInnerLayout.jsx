import React from 'react';
import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import VoucherSettingForm from './VoucherSettingForm';

const VoucherSettingInnerLayout = ({vouchers, installmentNo, transportFeeStructure}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <VoucherSettingForm 
                        vouchers = {vouchers}
                        installmentNo={installmentNo}
                        transportFeeStructure={transportFeeStructure}
                    />
                </div>
            </div>
        </div>
    );
};

export default VoucherSettingInnerLayout;