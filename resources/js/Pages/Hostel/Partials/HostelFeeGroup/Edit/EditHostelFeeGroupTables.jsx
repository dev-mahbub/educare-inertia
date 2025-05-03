import React, { useState } from "react";
import EditHostelFeeGroupLeftTable from "./EditHostelFeeGroupLeftTable";
import HostelFeeList from "../List/HostelFeeList";

const HostelFeeGroupTables = ({
    feeTypeData,
    hostelFees,
    hostelFee,
}) => {
    return (
        <>
            <div className="educare-parent-montly-income-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                        <EditHostelFeeGroupLeftTable
                            feeTypeData={feeTypeData}
                            hostelFee={hostelFee}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                        <HostelFeeList
                            hostelFees={hostelFees}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HostelFeeGroupTables;
