import React from 'react';
import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import BulkAllocationForm from './BulkAllocationForm';

const BulkAllocationInnerLayout = ({
    availableSeats,
    classrooms,
    students,
    vouchers,
    routes,
    transportTypeArr,
    amountPrice,
    stoppages,
    transportFeeStructureSetting,
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
                    <BulkAllocationForm
                        availableSeats={availableSeats}
                        classrooms={classrooms}
                        students={students}
                        vouchers={vouchers}
                        routes={routes}
                        transportTypeArr={transportTypeArr}
                        amountPrice={amountPrice}
                        stoppages={stoppages}
                        transportFeeStructureSetting={transportFeeStructureSetting}
                    />
                </div>
            </div>
        </div>
    );
};

export default BulkAllocationInnerLayout;
