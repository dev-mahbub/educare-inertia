import { useState } from "react";
import TrialBalanceReportLeftDiv from "./TrialBalanceReportLeftDiv";
import TrialBalanceReportRightDiv from "./TrialBalanceReportRightDiv";

const TrialBalanceReportTables = ({
    accountGroupSummary
}) => {
    const [selectedAccountGroup, setSelectedAccountGroup] = useState({});

    return (
        <>
            <div className="educare-parent-montly-income-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                        <TrialBalanceReportLeftDiv
                            setSelectedAccountGroup={setSelectedAccountGroup}
                            accountGroupSummary={accountGroupSummary}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                        <TrialBalanceReportRightDiv
                            selectedAccountGroup={selectedAccountGroup}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrialBalanceReportTables;
