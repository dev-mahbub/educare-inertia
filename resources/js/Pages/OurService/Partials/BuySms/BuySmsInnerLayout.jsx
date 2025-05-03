import { useState } from 'react';
import CustomerInvoiceMenu from '../UnpaidInvoice/CustomerInvoiceMenu';
import BuySmsFilter from './BuySmsFilter';
import BuySmsList from './BuySmsList';

const BuySmsInnerLayout = ({
    smsQuantities,
    // selectedSmsQuantities,
    // orderId,
    // keyId,
    // amount,
}) => {

    const [selectedSmsQuantity, setSelectedSmsQuantity] = useState({});

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <CustomerInvoiceMenu title="Customer Invoices" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <BuySmsFilter
                        smsQuantities={smsQuantities}
                        setSelectedSmsQuantity={setSelectedSmsQuantity}
                    />
                    <BuySmsList
                        selectedSmsQuantity={selectedSmsQuantity}
                        // selectedSmsQuantities={selectedSmsQuantities}
                        // orderId={orderId}
                        // keyId={keyId}
                        // amount={amount}
                    />
                </div>
            </div>
        </div>
    );
};

export default BuySmsInnerLayout;
