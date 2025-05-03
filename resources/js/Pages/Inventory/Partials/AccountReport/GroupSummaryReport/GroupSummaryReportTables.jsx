import { useState } from "react";
import GroupSummaryReportLeftDiv from "./GroupSummaryReportLeftDiv";
import GroupSummaryReportRightDiv from "./GroupSummaryReportRightDiv";

const GroupSummaryReportTables = ({
    accountGroups,
    groupSummary
}) => {
    const [selectedAccountGroup, setSelectedAccountGroup] = useState({});

    return (
        <>
            <div className="educare-parent-montly-income-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                        <GroupSummaryReportLeftDiv
                            accountGroups={accountGroups}
                            setSelectedAccountGroup={setSelectedAccountGroup}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                        <GroupSummaryReportRightDiv
                            groupSummary={groupSummary}
                            selectedAccountGroup={selectedAccountGroup}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupSummaryReportTables;
