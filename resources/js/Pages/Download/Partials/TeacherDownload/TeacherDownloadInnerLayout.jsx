import React from "react";
import DownloadHeaderMenus from "@/Components/Partials/Menus/Download/DownloadHeaderMenus";
import TeacherDownloadMain from "./TeacherDownloadMain";
const TeacherDownloadInnerLayout = () => {
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
                       <TeacherDownloadMain />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherDownloadInnerLayout;
