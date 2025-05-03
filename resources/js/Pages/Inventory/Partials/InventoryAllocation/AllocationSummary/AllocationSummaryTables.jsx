import { useState } from "react";
import AllocationSummaryLeftTable from "./AllocationSummaryLeftTable";
import AllocationSummaryRightTable from "./AllocationSummaryRightTable";

const AllocationSummaryTables = ({
    allocationSummary,
}) => {

    const [allocationData, setAllocationData] = useState({});

    return (
        <>
            <div className="educare-parent-montly-income-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                        <AllocationSummaryLeftTable
                            setAllocationData={setAllocationData}
                            allocationSummary={allocationSummary}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                        <AllocationSummaryRightTable
                            allocationData={allocationData}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllocationSummaryTables;
