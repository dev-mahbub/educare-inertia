import ConfigurationHeaderMenus from '@/Components/Partials/Menus/SetupYourSchool/ConfigurationHeaderMenus';
import MailSettingCreateForm from "./MailSettingCreateForm";

const MailSettingCreateInnerLayout = ({
    mailSettings,
    classrooms,
    staffData,
    mailEngineTypes,
    mailEncryptionTypes,
    mailAuthEnableTypes
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <ConfigurationHeaderMenus title="Configuration Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <MailSettingCreateForm
                        mailSettings={mailSettings}
                        classrooms={classrooms}
                        staffData={staffData}
                        mailEngineTypes={mailEngineTypes}
                        mailEncryptionTypes={mailEncryptionTypes}
                        mailAuthEnableTypes={mailAuthEnableTypes}
                    />
                </div>
            </div>
        </div>
    );
};

export default MailSettingCreateInnerLayout;
