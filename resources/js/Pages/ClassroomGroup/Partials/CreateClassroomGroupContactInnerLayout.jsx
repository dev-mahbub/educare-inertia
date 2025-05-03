import React from "react";
import ClassroomGroupForm from "./ClassroomGroupForm";
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const CreateClassroomGroupInnerLayout = ({classroomGroups}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <ConfigurationHeaderMenus title="Class Groups" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ClassroomGroupForm
                        classroomGroups={classroomGroups}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateClassroomGroupInnerLayout;