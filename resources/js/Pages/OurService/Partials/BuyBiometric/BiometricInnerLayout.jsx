import React from 'react';
import CustomerInvoiceMenu from '../UnpaidInvoice/CustomerInvoiceMenu';
import BuyBiometricList from './BuyBiometricList';

const BiometricInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <CustomerInvoiceMenu title="Customer Invoices" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <BuyBiometricList />
                </div>
            </div>
        </div>
    );
};

export default BiometricInnerLayout;