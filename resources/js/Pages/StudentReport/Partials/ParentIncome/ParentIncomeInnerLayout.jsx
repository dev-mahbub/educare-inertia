import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import ParentIncomeFilter from './ParentIncomeFilter';

const ParentIncomeInnerLayout = ({
    parentIncomeReport,
    guardians
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <StudentHeaderMenus title="STUDENTS" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <ParentIncomeFilter
                            parentIncomeReport={parentIncomeReport}
                            guardians={guardians}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ParentIncomeInnerLayout;
