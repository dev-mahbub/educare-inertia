import React from "react";
import SiblingFilter from "./SiblingFilter";
import SiblingTable from "./SiblingTable";
import DownloadHeaderMenus from "@/Components/Partials/Menus/Download/DownloadHeaderMenus";
const SiblingInnerLayout = () => {
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
                        <SiblingFilter />
                        <SiblingTable />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SiblingInnerLayout;
