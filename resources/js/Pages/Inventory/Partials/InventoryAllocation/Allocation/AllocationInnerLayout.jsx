import React from 'react';
import InventoryHeaderMenus from '@/Components/Partials/Menus/Inventory/InventoryHeaderMenus';
import AllocationForm from './AllocationForm';

const AllocationInnerLayout = ({
    staffNames,
    products,
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
                    <AllocationForm
                        staffNames={staffNames}
                        products={products}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllocationInnerLayout;
