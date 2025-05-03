import React from "react";
import StaffCategoryForm from "./StaffCategoryForm";
import ConfigurationHeaderMenus from "@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus";

const CreateCategoryStaffInnerLayout = ({staffCategories, staffParent}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="Staff Category" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StaffCategoryForm
                        staffCategories={staffCategories}
                        staffParent={staffParent}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateCategoryStaffInnerLayout;
