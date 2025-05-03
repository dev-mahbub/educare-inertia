
const PurchaseSummaryReportDateReport = ({
    dateWiseReport,
    setLedgerWiseReport
}) => {
    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-CurrencyInr"></i>
                    Date Report
                </h5>
            </div>

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dateWiseReport?.length > 0 ?
                            <>
                                {dateWiseReport.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.date}</td>
                                        <td>
                                            <button
                                                className="font-semibold text-primary"
                                                type="button"
                                                onClick={() => setLedgerWiseReport(item?.ledger_wise_report ? Object.values(item.ledger_wise_report) : [])}
                                            >
                                                {parseFloat(item.amount ?? 0)?.toFixed(2)}
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                <tr>
                                    <td>Total</td>
                                    <td>{dateWiseReport.reduce((total, item) => total + parseFloat(item.amount ?? 0), 0)?.toFixed(2)}</td>
                                </tr>
                            </>
                        :
                            <tr>
                                <td className="text-center text-red-500" colSpan="2">Data not found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PurchaseSummaryReportDateReport;
