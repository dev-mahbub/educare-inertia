import InventoryHeaderMenus from '@/Components/Partials/Menus/Inventory/InventoryHeaderMenus';
import LedgerReceiptForm from './LedgerReceiptForm';

const LedgerReceiptInnerLayout = ({
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
                    <LedgerReceiptForm
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

export default LedgerReceiptInnerLayout;
