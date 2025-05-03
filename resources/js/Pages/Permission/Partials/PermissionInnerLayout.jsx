import React from 'react';
import ModuleHeaderMenus from '@/Components/Partials/Menus/Module/ModuleHeaderMenus';
import PermissionFilter from './PermissionFilter';
import PermissionsForm from './PermissionsForm';

const PermissionInnerLayout = ({auth, siteData, roles, users, selectedPermissions, checkData}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <ModuleHeaderMenus auth={auth} siteData={siteData} />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <PermissionFilter roles={roles} users={users} checkData={checkData} />
                    <PermissionsForm roles={roles} users={users} selectedPermissions={selectedPermissions} checkData={checkData} />
                </div>
            </div>
        </div>
    );
};

export default PermissionInnerLayout;