import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import CreateVoucherTypeForm from "./CreateVoucherTypeForm";

const CreateVoucherTypeInnerLayout = ({ vouchers, voucherTypeArr, vendors }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateVoucherTypeForm
                        vouchers={vouchers}
                        voucherTypeArr={voucherTypeArr}
                        vendors={vendors}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateVoucherTypeInnerLayout;
