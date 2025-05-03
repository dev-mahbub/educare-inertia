import TeamHeaderMenus from '@/Components/Partials/Menus/Team/TeamHeaderMenus';
import React from 'react';
import TeamManageFormTable from './TeamManageFormTable';

const TeamManageInnerLayout = () => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <TeamHeaderMenus title="TEAM MANAGEMENT" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <TeamManageFormTable />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamManageInnerLayout;