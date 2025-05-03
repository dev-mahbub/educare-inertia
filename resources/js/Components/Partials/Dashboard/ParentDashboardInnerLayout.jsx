import ParentDashboardTables from "./Parent/ParentDashboardTables";

const ParentDashboardInnerLayout = ({
    students,
    studentId
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle bg-white">
                    {/* Menus here */}
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ParentDashboardTables
                        students={students}
                        studentId={studentId}
                    />
                </div>
            </div>
        </div>
    );
};

export default ParentDashboardInnerLayout;
