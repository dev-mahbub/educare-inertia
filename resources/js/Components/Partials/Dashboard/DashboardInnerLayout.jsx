import React from "react";
import MisReportMenu from "../Header/MisReportMenu";
import HeaderSeacrhBar from "../Header/HeaderSeacrhBar";
import QuickReports from "./QuickReports";
import GroupTrainingReports from "./GroupTrainingReports";
import BulkTextMessages from "./BulkTextMessages";
import UpcomingEvents from "./UpcomingEvents";
import TodaysCollection from "./TodaysCollection";
import SchoolManager from "./SchoolManager";
import BuildBrands from "./BuildBrands";
import TodaysTaskReports from "./TodaysTaskReports";

const DashboardInnerLayout = ({siteData, studentCounts, staffCounts, transportCounts}) => {

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle bg-white">
                    <MisReportMenu />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <div className="mb-[30px] educare-bottom-header-search">
                        <HeaderSeacrhBar />
                    </div>
                    { ((siteData?.authRoles.indexOf("Super Admin") > -1) || (siteData?.authRoles.indexOf('Admin') > -1)) &&
                    <QuickReports 
                        studentCounts={studentCounts} 
                        staffCounts={staffCounts}
                        transportCounts={transportCounts} />
                    }
                    <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                        
                        <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-12">
                            <BuildBrands />
                        </div>
                        <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 minMaxLg:col-span-12 maxMd:col-span-12 max">
                            <SchoolManager />
                        </div>
                        <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-12">
                            <TodaysCollection />
                        </div>
                        <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-12">
                            <TodaysTaskReports />
                        </div>

                        <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-6 maxSm:col-span-12">
                            <BulkTextMessages />
                        </div>

                        <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-6 maxSm:col-span-12">
                            <UpcomingEvents />
                        </div>

                        <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-12">
                            <GroupTrainingReports />
                        </div>
                        
                        
                        
                        
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardInnerLayout;
