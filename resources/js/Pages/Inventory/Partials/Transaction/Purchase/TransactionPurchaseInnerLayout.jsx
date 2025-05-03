import React from 'react';
import TransactionPurchase from './TransactionPurchase';
import InventoryHeaderMenus from '@/Components/Partials/Menus/Inventory/InventoryHeaderMenus';

const TransactionPurchaseInnerLayout = ({
    productNames,
    ledgerNames,
    partyAccountNames,
    receiptNo,
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
                    <TransactionPurchase
                        productNames={productNames}
                        ledgerNames={ledgerNames}
                        partyAccountNames={partyAccountNames}
                        receiptNo={receiptNo}
                    />
                </div>
            </div>
        </div>
    );
};

export default TransactionPurchaseInnerLayout;
