import InventoryHeaderMenus from '@/Components/Partials/Menus/Inventory/InventoryHeaderMenus';
import LedgerPaymentForm from './LedgerPaymentForm';

const LedgerPaymentInnerLayout = ({
    accountGroupTitles,
    ledgerGroupTitles,
    ledgerTitles,
    paymentModes,
    nextReceiptNo
 }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <InventoryHeaderMenus title="Academics Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <LedgerPaymentForm
                        accountGroupTitles={accountGroupTitles}
                        ledgerGroupTitles={ledgerGroupTitles}
                        ledgerTitles={ledgerTitles}
                        paymentModes={paymentModes}
                        nextReceiptNo={nextReceiptNo}
                    />
                </div>
            </div>
        </div>
    );
};

export default LedgerPaymentInnerLayout;
