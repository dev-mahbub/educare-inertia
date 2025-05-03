import React from 'react';
import HostelFeeGroupTables from './HostelFeeGroupTables';
import HostelHeaderMenus from '@/Components/Partials/Menus/Hostel/HostelHeaderMenus';

const HostelFeeGroupInnerLayout = ({
    feeTypeData,
    hostelFees,
    hostelFee,
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
                        <HostelFeeGroupTables
                            feeTypeData={feeTypeData}
                            hostelFees={hostelFees}
                            hostelFee={hostelFee}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HostelFeeGroupInnerLayout;
