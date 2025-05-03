import { useState } from "react";
import SaleSummaryReportDateReport from "./SaleSummaryReportDateReport";
import SaleSummaryReportFirstTable from "./SaleSummaryReportFirstTable";
import SSRItemReport from "./SSRItemReport";
import SSRLedgerReport from "./SSRLedgerReport";

const SaleSummaryReportTables = ({
    saleSummaryReport
}) => {

    const [dateWiseReport, setDateWiseReport] = useState([]);
    const [ledgerWiseReport, setLedgerWiseReport] = useState([]);
    const [itemReport, setItemReport] = useState([]);

    return (
        <>
            <div className="educare-parent-montly-income-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-3 lg:col-span-3">
                        <SaleSummaryReportFirstTable
                            saleSummaryReport={saleSummaryReport}
                            setDateWiseReport={setDateWiseReport}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-2 lg:col-span-2">
                        <SaleSummaryReportDateReport
                            dateWiseReport={dateWiseReport}
                            setLedgerWiseReport={setLedgerWiseReport}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-2 lg:col-span-2">
                        <SSRLedgerReport
                            ledgerWiseReport={ledgerWiseReport}
                            setItemReport={setItemReport}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                        <SSRItemReport
                            itemReport={itemReport}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SaleSummaryReportTables;
