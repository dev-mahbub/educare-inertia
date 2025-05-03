import React from 'react';
import ImprovePresenceForm from './ImprovePresenceForm';
import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';

const ImprovePresenceInnerLayout = ({
    presenceSettings,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <ConfigurationHeaderMenus title="Improve Presence On Internet" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ImprovePresenceForm
                        presenceSettings={presenceSettings}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImprovePresenceInnerLayout;
