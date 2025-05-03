import React from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import EditCompanyForm from "./EditCompanyForm";

const EditCompanyInnerLayout = ({
    company,
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
                    <EditCompanyForm
                        company={company}
                        companies={companies}
                        search={search}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditCompanyInnerLayout;
