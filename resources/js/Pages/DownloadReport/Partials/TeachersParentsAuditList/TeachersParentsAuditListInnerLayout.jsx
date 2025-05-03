import React from "react";
import TeachersParentsAuditListFilter from "./TeachersParentsAuditListFilter";
import TeachersParentsAuditListTable from "./TeachersParentsAuditListTable";
import DownloadHeaderMenus from "@/Components/Partials/Menus/Download/DownloadHeaderMenus";

const TeachersParentsAuditListInnerLayout = () => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                        <DownloadHeaderMenus title="Download Management"/>
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <TeachersParentsAuditListFilter />
                        <TeachersParentsAuditListTable />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeachersParentsAuditListInnerLayout;
