import React from "react";
import CourseCategoryForm from "./CourseCategoryForm";
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const CreateCourseCategoryInnerLayout = ({courseCategories}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="Caste Category" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CourseCategoryForm
                        courseCategories={courseCategories}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateCourseCategoryInnerLayout;