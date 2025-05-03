import React from "react";
import DepartmentForm from "./DepartmentForm";
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const CreateDepartmentInnerLayout = ({departments}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="School Departments" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <DepartmentForm
                        departments={departments}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateDepartmentInnerLayout;