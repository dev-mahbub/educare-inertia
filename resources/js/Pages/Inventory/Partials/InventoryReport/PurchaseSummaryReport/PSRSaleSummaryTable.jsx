
const PSRSaleSummaryTable = ({
    purchaseSummaryReport,
    setDateWiseReport
}) => {
    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-CurrencyInr"></i>
                    Purchase Summary
                </h5>
            </div>

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseSummaryReport?.length > 0 ?
                            <>
                                {purchaseSummaryReport.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.month}</td>
                                        <td>
                                            <button
                                                className="font-semibold text-primary"
                                                type="button"
                                                onClick={() => setDateWiseReport(item?.date_wise_report ? Object.values(item.date_wise_report) : [])}
                                            >
                                                {parseFloat(item.amount ?? 0)?.toFixed(2)}
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                <tr>
                                    <td>Total</td>
                                    <td>
                                        {purchaseSummaryReport.reduce((total, item) => total + parseFloat(item.amount ?? 0), 0)?.toFixed(2)}
                                    </td>
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

export default PSRSaleSummaryTable;
