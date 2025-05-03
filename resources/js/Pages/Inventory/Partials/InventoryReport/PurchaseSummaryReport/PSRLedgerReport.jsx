
const PSRLedgerReport = ({
    ledgerWiseReport,
    setItemReport,
    setSelectedLedgerReport
}) => {

    // handle select ledger report start
    const handleSelectLedgerReport = (item) => {
        setItemReport(item?.item_report ? Object.values(item.item_report) : []);
        setSelectedLedgerReport(item);
    }
    // handle select ledger report end

    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-CurrencyInr"></i>
                    Ledger Report
                </h5>
            </div>

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Ledger</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ledgerWiseReport?.length > 0 ?
                            <>
                                {ledgerWiseReport.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.ledger_title}</td>
                                        <td>
                                            <button
                                                className="font-semibold text-primary"
                                                type="button"
                                                onClick={() => {
                                                    handleSelectLedgerReport(item)
                                                }}
                                            >
                                                {parseFloat(item.amount ?? 0)?.toFixed(2)}
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                <tr>
                                    <td>Total</td>
                                    <td>{ledgerWiseReport.reduce((total, item) => total + parseFloat(item.amount ?? 0), 0)?.toFixed(2)}</td>
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

export default PSRLedgerReport;
