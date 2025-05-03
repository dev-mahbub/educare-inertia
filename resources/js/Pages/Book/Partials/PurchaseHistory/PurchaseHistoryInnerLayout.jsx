import LibraryHeaderMenus from '@/Components/Partials/Menus/Library/LibraryHeaderMenus';
import React, { useState } from 'react';
import PurchaseHistoryFilter from './PurchaseHistoryFilter';
import PurchaseHistoryTableList from './PurchaseHistoryTableList';

const PurchaseHistoryInnerLayout = ({
    bookPurchase,
    libraryVendor,
}) => {

    const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <LibraryHeaderMenus title="Library Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <PurchaseHistoryFilter
                            setLoading={setLoading}
                            libraryVendor={libraryVendor}
                        />
                        <PurchaseHistoryTableList
                            bookPurchase={bookPurchase}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PurchaseHistoryInnerLayout;
