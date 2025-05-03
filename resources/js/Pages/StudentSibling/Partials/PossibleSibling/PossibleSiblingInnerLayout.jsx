import StudentHeaderMenus from "@/Components/Partials/Menus/Student/StudentHeaderMenus";
import React from "react";
import PossibleSiblingFilter from "./PossibleSiblingFilter";
import PossibleSiblingTable from "./PossibleSiblingTable";
import { useState } from "react";

const PossibleSiblingInnerLayout = ({
    possibleSibling,
    parentRowData,
    classrooms,
}) => {

    const [loading, setLoading] = useState(false)

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
                        <PossibleSiblingFilter
                            possibleSiblingLength={possibleSibling?.length}
                            classrooms={classrooms}
                            setLoading={setLoading}
                        />
                        <PossibleSiblingTable
                            possibleSibling={possibleSibling}
                            parentRowData={parentRowData}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PossibleSiblingInnerLayout;
