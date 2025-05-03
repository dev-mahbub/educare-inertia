import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import OutstandingDueReportFilter from './OutstandingDueReportFilter';

const OutstandingDueReportInnerLayout = ({
    classNames = [],
    classrooms = [],
    fees = [],
    feeCategories = [],
    feeStructures = [],
    student_status_array = [],
    classDueReports = [],
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
                    <OutstandingDueReportFilter
                        classNames={classNames}
                        classrooms={classrooms}
                        fees={fees}
                        feeCategories={feeCategories}
                        feeStructures={feeStructures}
                        student_status_array={student_status_array}
                        classDueReports={classDueReports}
                    />
                </div>
            </div>
        </div>
    );
};

export default OutstandingDueReportInnerLayout;
