import { useState } from "react";
import PSRItemReport from "./PSRItemReport";
import PSRLedgerReport from "./PSRLedgerReport";
import PSRSaleSummaryTable from "./PSRSaleSummaryTable";
import PurchaseSummaryReportDateReport from "./PurchaseSummaryReportDateReport";

const PurchaseSummaryReportTables = ({
    purchaseSummaryReport
}) => {

    const [dateWiseReport, setDateWiseReport] = useState([]);
    const [ledgerWiseReport, setLedgerWiseReport] = useState([]);
    const [itemReport, setItemReport] = useState([]);
    const [selectedLedgerReport, setSelectedLedgerReport] = useState([]);

    return (
        <>
            <div className="educare-parent-montly-income-area">
                <form>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 xl:col-span-3 lg:col-span-3">
                            <PSRSaleSummaryTable
                                purchaseSummaryReport={purchaseSummaryReport}
                                setDateWiseReport={setDateWiseReport}
                            />
                        </div>
                        <div className="col-span-12 xl:col-span-2 lg:col-span-2">
                            <PurchaseSummaryReportDateReport
                                dateWiseReport={dateWiseReport}
                                setLedgerWiseReport={setLedgerWiseReport}
                            />
                        </div>
                        <div className="col-span-12 xl:col-span-2 lg:col-span-2">
                            <PSRLedgerReport
                                ledgerWiseReport={ledgerWiseReport}
                                setItemReport={setItemReport}
                                setSelectedLedgerReport={setSelectedLedgerReport}
                            />
                        </div>
                        <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                            <PSRItemReport
                                itemReport={itemReport}
                                selectedLedgerReport={selectedLedgerReport}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PurchaseSummaryReportTables;
