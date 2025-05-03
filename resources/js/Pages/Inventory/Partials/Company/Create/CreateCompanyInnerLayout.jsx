import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import CreateCompanyForm from "./CreateCompanyForm";

const CreateCompanyInnerLayout = ({
    companies,
    search,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateCompanyForm
                        companies={companies}
                        search={search}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateCompanyInnerLayout;
