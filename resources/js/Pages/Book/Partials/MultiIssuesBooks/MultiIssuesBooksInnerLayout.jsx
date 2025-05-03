import LibraryHeaderMenus from "@/Components/Partials/Menus/Library/LibraryHeaderMenus";
import React from "react";
import MultiIssuesBooksTables from "./MultiIssuesBooksTables";

const MultiIssuesBooksInnerLayout = () => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <LibraryHeaderMenus title="Library Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <MultiIssuesBooksTables />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MultiIssuesBooksInnerLayout;
