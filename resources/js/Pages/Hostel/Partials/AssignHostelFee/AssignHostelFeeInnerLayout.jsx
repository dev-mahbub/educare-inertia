import HostelHeaderMenus from "@/Components/Partials/Menus/Hostel/HostelHeaderMenus";
import React from "react";
import AssignHostelFeeTables from "./AssignHostelFeeTables";

const AssignHostelFeeInnerLayout = ({
    classNames,
    classrooms,
    hostelFeeData,
    hostelVoucherData,
    studentData,
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <HostelHeaderMenus title="HOSTEL MANAGEMENT" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <AssignHostelFeeTables
                            classNames={classNames}
                            classrooms={classrooms}
                            hostelFeeData={hostelFeeData}
                            hostelVoucherData={hostelVoucherData}
                            studentData={studentData}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AssignHostelFeeInnerLayout;
