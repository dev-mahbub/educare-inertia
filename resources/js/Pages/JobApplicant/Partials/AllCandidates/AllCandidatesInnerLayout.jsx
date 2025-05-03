import JobHeaderMenus from "@/Components/Partials/Menus/Job/JobHeaderMenus";
import React from "react";
import AllCandidatesFilter from "./AllCandidatesFilter";
import AllCandidatesTable from "./AllCandidatesTable";
const AllCandidatesInnerLayout = () => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header">
                        <div className="educare-bottom-header-middle bg-white">
                            <JobHeaderMenus title="HR MANAGEMENT" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <AllCandidatesFilter />
                        <AllCandidatesTable />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllCandidatesInnerLayout;
