import React from 'react';
import StaffMisQuickReport from './StaffMisQuickReport';
import StaffsDepartmentAnalysis from './StaffsDepartmentAnalysis';
import StaffReligionAnalytics from './StaffReligionAnalytics';
import StaffCasteAnalytics from './StaffCasteAnalytics';
import StaffDesignationAnalytics from './StaffDesignationAnalytics';
import StaffJobAnalytics from './StaffJobAnalytics';
import StaffHeaderMenus from '@/Components/Partials/Menus/Staff/StaffHeaderMenus';

const StaffMisReportInnerLayout = ({ auth, siteData, staffs, misCounts, departmentsStaffs, religionStaffs, 
    castleStaffs, jobTypeStaffs, designationStaffs}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle bg-white">
                    <StaffHeaderMenus title="Manage Employees" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StaffMisQuickReport misCounts={misCounts}  />
                    <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                        <div className="col-span-12 lg:col-span-6">
                            <StaffsDepartmentAnalysis 
                                departmentsStaffs={departmentsStaffs} />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <StaffReligionAnalytics 
                                religionStaffs={religionStaffs}  />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <StaffCasteAnalytics 
                                castleStaffs={castleStaffs} />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <StaffDesignationAnalytics 
                                designationStaffs={designationStaffs} />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <StaffJobAnalytics 
                                jobTypeStaffs={jobTypeStaffs} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffMisReportInnerLayout;