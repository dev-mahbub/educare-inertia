import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import FeeSettingForm from './FeeSettingForm';

const FeeSettingInnerLayout = ({ companies, transportSettingsData }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeeSettingForm
                        companies={companies}
                        transportSettingsData={transportSettingsData}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeeSettingInnerLayout;
