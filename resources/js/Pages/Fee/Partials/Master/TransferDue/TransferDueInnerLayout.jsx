import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import TransferDueForm from './TransferDueForm';

const TransferDueInnerLayout = ({
    academicYears = [],
    classrooms = [],
    currentAcademicYear = {},
    siteData
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
                    <TransferDueForm
                        academicYears={academicYears}
                        classrooms={classrooms}
                        currentAcademicYear={currentAcademicYear}
                        siteData={siteData}
                    />
                </div>
            </div>
        </div>
    );
};

export default TransferDueInnerLayout;
