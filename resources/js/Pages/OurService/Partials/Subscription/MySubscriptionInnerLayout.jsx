import CustomerInvoiceMenu from '../UnpaidInvoice/CustomerInvoiceMenu';
import MySubscriptionList from './MySubscriptionList';

const MySubscriptionInnerLayout = ({
    subscriptions
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
                    <MySubscriptionList
                        subscriptions={subscriptions}
                    />
                </div>
            </div>
        </div>
    );
};

export default MySubscriptionInnerLayout;
