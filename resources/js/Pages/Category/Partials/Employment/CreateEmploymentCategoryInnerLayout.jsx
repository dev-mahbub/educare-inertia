import React from "react";
import EmploymentCategoryForm from "./EmploymentCategoryForm";
import ConfigurationHeaderMenus from "@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus";

const CreateEmploymentCategoryInnerLayout = ({employmentCategories, emp_cat_types}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="Employment Category" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <EmploymentCategoryForm
                        employmentCategories={employmentCategories}
                        emp_cat_types={emp_cat_types}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateEmploymentCategoryInnerLayout;