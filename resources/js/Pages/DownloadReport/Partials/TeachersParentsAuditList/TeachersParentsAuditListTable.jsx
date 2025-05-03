import React from "react";
import TeachersParentsAuditListLeftTable from "./TeachersParentsAuditListLeftTable";
import TeachersParentsAuditListRightTable from "./TeachersParentsAuditListRightTable";

const TeachersParentsAuditListTable = () => {
    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <TeachersParentsAuditListLeftTable />
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <TeachersParentsAuditListRightTable />
                </div>
            </div>
        </>
    );
};

export default TeachersParentsAuditListTable;
