import React, { useState } from 'react';
import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import VoucherDueForm from './VoucherDueForm';
import VoucherDueFilter from './VoucherDueFilter';

const VoucherDueInnerLayout = ({
    transportFeeStructureSetting,
    academicYearData,
    currentAcademicYear,
    classNames,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    {/* <VoucherDueFilter
                        transportFeeStructureSetting={transportFeeStructureSetting}
                        academicYearData={academicYearData}
                        currentAcademicYear={currentAcademicYear}
                        setAcademicYearId={setAcademicYearId}
                    /> */}
                    <VoucherDueForm
                        transportFeeStructureSetting={transportFeeStructureSetting}
                        academicYearData={academicYearData}
                        currentAcademicYear={currentAcademicYear}
                        classNames={classNames}
                    />
                </div>
            </div>
        </div>
    );
};

export default VoucherDueInnerLayout;
