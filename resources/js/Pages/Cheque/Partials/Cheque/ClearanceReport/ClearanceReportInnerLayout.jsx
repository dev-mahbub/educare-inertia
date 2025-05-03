import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import ClearanceReportList from './ClearanceReportList';

const ClearanceReportInnerLayout = ({  chequeClearanceReports = []}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ClearanceReportList chequeClearanceReports={chequeClearanceReports} />
                </div>
            </div>
        </div>
    );
};

export default ClearanceReportInnerLayout;
