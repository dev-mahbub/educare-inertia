import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import CreateAccountGroupForm from "./CreateAccountGroupForm";

const CreateAccountGroupInnerLayout = ({ parentTitles, accountGroups }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateAccountGroupForm
                        parentTitles={parentTitles}
                        accountGroups={accountGroups}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateAccountGroupInnerLayout;
