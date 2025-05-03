import StudentHeaderMenus from "@/Components/Partials/Menus/Student/StudentHeaderMenus";
import React from "react";
import ExistingSiblingsFilter from "./ExistingSiblingsFilter";
import ExistingSiblingsTable from "./ExistingSiblingsTable";

const ExistingSiblingsInnerLayout = () => {
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
                        <ExistingSiblingsFilter />
                        <ExistingSiblingsTable />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExistingSiblingsInnerLayout;
