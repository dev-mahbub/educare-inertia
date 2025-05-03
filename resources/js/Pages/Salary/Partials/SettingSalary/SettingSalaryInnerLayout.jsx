import SalaryHeaderMenu from "@/Components/Partials/Menus/Salary/SalaryHeaderMenu";
import SettingSalaryTable from "./SettingSalaryTable";

const SettingSalaryInnerLayout = ({
    siteSettings
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <SalaryHeaderMenu title="Salary Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <SettingSalaryTable
                            siteSettings={siteSettings}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingSalaryInnerLayout;
