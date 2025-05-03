import React from "react";
import BulkUploadImageList from "./BulkUploadImageList";
import StudentHeaderMenus from "@/Components/Partials/Menus/Student/StudentHeaderMenus";

const BulkUploadImageInnerLayout = ({}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Students" />
                    </div>
                </div>

                <div className="educare-dashboard-main-content-body-wrap">
                    <div className="educare-card-title">
                        <BulkUploadImageList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkUploadImageInnerLayout;
