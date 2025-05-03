import CustomerInvoiceMenu from '../UnpaidInvoice/CustomerInvoiceMenu';
import ErpPaidInvoiceList from './ErpPaidInvoiceList';

const ErpPaidInvoiceListInnerLayout = ({
    paidInvoices
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <CustomerInvoiceMenu title="Customer Invoices" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ErpPaidInvoiceList
                        paidInvoices={paidInvoices}
                    />
                </div>
            </div>
        </div>
    );
};

export default ErpPaidInvoiceListInnerLayout;
