import React, { useState } from "react";
import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import StudentTeacherLedgerTableAndFilter from "./StudentTeacherLedgerTableAndFilter";

const StudentTeacherLedgerInnerLayout = ({
    classrooms,
    stuTeaTypeArr,
    students,
    teachers,
    dataList,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentTeacherLedgerTableAndFilter
                        classrooms={classrooms}
                        stuTeaTypeArr={stuTeaTypeArr}
                        students={students}
                        teachers={teachers}
                        dataList={dataList}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentTeacherLedgerInnerLayout;
