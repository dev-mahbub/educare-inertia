import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import FeeSettings from './FeeSettings';

const FeeSettingInnerLayout = ({
    siteSettingsFee = {},
    siteSettingsAccount = {},
    templateTags = [],
    lateFineTypes = [],
    currentAcademicYear,
    backDateStaffIds,
    staffs,
    paymentGatewaySettings
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeeSettings
                        siteSettingsFee={siteSettingsFee}
                        siteSettingsAccount={siteSettingsAccount}
                        templateTags={templateTags}
                        lateFineTypes={lateFineTypes}
                        currentAcademicYear={currentAcademicYear}
                        backDateStaffIds={backDateStaffIds}
                        staffs={staffs}
                        paymentGatewaySettings={paymentGatewaySettings}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeeSettingInnerLayout;
