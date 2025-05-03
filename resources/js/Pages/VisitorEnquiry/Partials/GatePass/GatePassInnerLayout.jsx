import EnquiryHeaderMenus from "@/Components/Partials/Menus/Enquiry/EnquiryHeaderMenus";
import React from "react";
import GatePassTables from "./GatePassTables";

const GatePassInnerLayout = ({
    visitors,
    relactionType,
    classrooms,
    students,
    studentGatePass,
    gateNextNo,
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <EnquiryHeaderMenus title="Visitors Enquiry Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <GatePassTables classrooms={classrooms} visitors={visitors}  relactionType={relactionType} students={students} studentGatePass={studentGatePass} gateNextNo={gateNextNo}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GatePassInnerLayout;
