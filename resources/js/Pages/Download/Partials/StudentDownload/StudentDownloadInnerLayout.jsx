import React from "react";
import DownloadHeaderMenus from "@/Components/Partials/Menus/Download/DownloadHeaderMenus";
import StudentDownloadMain from "./StudentDownloadMain";
const StudentDownloadInnerLayout = () => {
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
                       <StudentDownloadMain />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentDownloadInnerLayout;
