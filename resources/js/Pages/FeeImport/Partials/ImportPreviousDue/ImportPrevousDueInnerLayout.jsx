import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import ImportPreviousDue from './ImportPreviousDue';

const ImportPrevousDueInnerLayout = ({ fees = [], feeTypes = [] }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ImportPreviousDue
                        fees={fees}
                        feeTypes={feeTypes}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImportPrevousDueInnerLayout;
