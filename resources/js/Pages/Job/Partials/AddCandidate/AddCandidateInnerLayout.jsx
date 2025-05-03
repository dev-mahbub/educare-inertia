import JobHeaderMenus from "@/Components/Partials/Menus/Job/JobHeaderMenus";
import React from "react";
import AddCandidateTable from "./AddCandidateTable";


const AddCandidateInnerLayout = () => {
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
                        <AddCandidateTable/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCandidateInnerLayout;
