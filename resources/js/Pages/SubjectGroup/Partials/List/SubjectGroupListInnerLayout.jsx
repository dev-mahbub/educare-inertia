// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";
import SubjectGroupTables from "./SubjectGroupTables";
const SubjectGroupListInnerLayout = ({
    infraLevels,
    childLevels,
    infraLavelIds,
    infraLavelIdString,
    currentLavelId,
    is_open,
    type,
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            {/* <AcademicsHeaderMenu title="Academics Management" /> */}
                            <AcademicsExamHeaderMenu title="Academics Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <SubjectGroupTables
                            infraLevels={infraLevels}
                            childLevels={childLevels}
                            infraLavelIds={infraLavelIds}
                            infraLavelIdString={infraLavelIdString}
                            currentLavelId={currentLavelId}
                            is_open={is_open}
                            type={type}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubjectGroupListInnerLayout;
