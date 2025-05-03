import React from 'react';
import ModuleHeaderMenus from '@/Components/Partials/Menus/Module/ModuleHeaderMenus';
import ModuleFilter from './ModuleFilter';
import ModuleForm from './ModuleForm';

const ModuleInnerLayout = ({auth, siteData, schools, modules, schoolId}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <ModuleHeaderMenus siteData={siteData} />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ModuleFilter schools={schools} schoolId={schoolId} />
                    <ModuleForm schools={schools} modules={modules} schoolId={schoolId} />
                </div>
            </div>
        </div>
    );
};

export default ModuleInnerLayout;