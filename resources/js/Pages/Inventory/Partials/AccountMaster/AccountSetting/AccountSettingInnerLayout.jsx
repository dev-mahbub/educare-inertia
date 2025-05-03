import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import AccountSettingForm from "./AccountSettingForm";

const AccountSettingInnerLayout = ({ siteSettings, siteSettingsReceipt, siteSettingsVoucher }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <AccountSettingForm
                        siteSettings={siteSettings}
                        siteSettingsReceipt={siteSettingsReceipt}
                        siteSettingsVoucher={siteSettingsVoucher}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccountSettingInnerLayout;
